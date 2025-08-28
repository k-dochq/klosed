import { useMutation, useQueryClient } from '@tanstack/react-query';

interface SendVerificationEmailRequest {
  email: string;
}

interface SendVerificationEmailResponse {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * 이메일 인증 메일 발송을 위한 TanStack Query Mutation Hook
 */
export function useSendVerificationEmail() {
  return useMutation<SendVerificationEmailResponse, Error, SendVerificationEmailRequest>({
    mutationFn: async ({ email }: SendVerificationEmailRequest) => {
      const response = await fetch('/api/email/send-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send verification email');
      }

      return response.json();
    },
    onSuccess: (data, variables) => {
      // 성공 시 필요한 캐시 무효화나 다른 작업 수행
      console.log('Verification email sent successfully:', variables.email);
    },
    onError: (error, variables) => {
      console.error('Failed to send verification email:', variables.email, error);
    },
  });
}
