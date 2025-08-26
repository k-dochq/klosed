import { useMutation } from '@tanstack/react-query';

interface InviteCodeValidationRequest {
  code: string;
}

interface InviteCodeValidationResponse {
  success: boolean;
  message?: string;
  errorCode?: string;
  data?: {
    id: number;
    code: string;
    maxUses: number;
    currentUses: number;
    isActive: boolean;
    expiresAt?: string;
  };
}

async function validateInviteCode(
  request: InviteCodeValidationRequest,
): Promise<InviteCodeValidationResponse> {
  const response = await fetch('/api/invite/validate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.errorCode || errorData.message || 'Failed to validate invitation code.',
    );
  }

  return response.json();
}

export function useInviteCodeValidation() {
  return useMutation({
    mutationFn: validateInviteCode,
    onSuccess: (data) => {
      console.log('Invite code validation successful:', data);
    },
    onError: (error) => {
      console.error('Invite code validation failed:', error);
    },
  });
}
