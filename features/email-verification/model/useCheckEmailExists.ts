'use client';

import { useMutation } from '@tanstack/react-query';

interface CheckEmailRequest {
  email: string;
}

interface CheckEmailResponse {
  success: boolean;
  exists: boolean;
  error?: string;
}

/**
 * 이메일 주소 존재 여부 체크를 위한 TanStack Query mutation
 */
export function useCheckEmailExists() {
  const mutation = useMutation<CheckEmailResponse, Error, CheckEmailRequest>({
    mutationFn: async ({ email }) => {
      const response = await fetch('/api/email/check-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to check email');
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to check email');
      }

      return result;
    },
  });

  return {
    checkEmailExists: mutation.mutate,
    checkEmailExistsAsync: mutation.mutateAsync,
    isChecking: mutation.isPending,
    emailExists: mutation.data?.exists ?? null,
    error: mutation.error?.message ?? null,
    reset: mutation.reset,
  };
}
