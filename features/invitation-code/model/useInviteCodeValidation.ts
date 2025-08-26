import { useMutation } from '@tanstack/react-query';

interface InviteCodeValidationRequest {
  code: string;
}

interface InviteCodeValidationResponse {
  success: boolean;
  message: string;
  inviteCode?: {
    id: number;
    code: string;
    maxUses: number;
    currentUses: number;
    isActive: boolean;
    expiresAt?: string;
  };
}

// 임시 함수 - 나중에 API route로 교체
async function validateInviteCode(
  request: InviteCodeValidationRequest,
): Promise<InviteCodeValidationResponse> {
  // TODO: 실제 API 호출로 교체
  console.log('Validating invite code:', request.code);

  // 임시 검증 로직
  const code = parseInt(request.code);
  if (code >= 1000 && code <= 2000) {
    return {
      success: true,
      message: '초대 코드가 유효합니다.',
      inviteCode: {
        id: code,
        code: request.code,
        maxUses: 1,
        currentUses: 0,
        isActive: true,
      },
    };
  }

  return {
    success: false,
    message: '유효하지 않은 초대 코드입니다.',
  };
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
