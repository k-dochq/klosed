'use client';

import { useState } from 'react';
import { createClient } from 'shared/lib/supabase/client';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { type Dictionary } from 'shared/model/types';

interface PasswordUpdateResult {
  success: boolean;
  error: string | null;
}

export function usePasswordUpdate(dict: Dictionary) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const router = useLocalizedRouter();
  const supabase = createClient();

  const updatePassword = async (password: string): Promise<PasswordUpdateResult> => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error: updateError } = await supabase.auth.updateUser({
        password: password,
      });

      if (updateError) {
        console.error('비밀번호 업데이트 실패:', updateError.message);
        const errorMessage =
          dict.auth?.passwordUpdate?.errors?.UPDATE_FAILED || 'Failed to update password.';
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }

      console.log('비밀번호 업데이트 성공:', data);
      setSuccess(true);

      // 성공 후 잠시 대기 후 휴대폰 인증 페이지로 이동
      router.push('/auth/phone-verification');

      return { success: true, error: null };
    } catch (error) {
      console.error('비밀번호 업데이트 중 오류:', error);
      const errorMessage =
        dict.auth?.passwordUpdate?.errors?.UNKNOWN_ERROR || 'An unknown error occurred.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    isLoading,
    error,
    success,
    updatePassword,
    clearError,
  };
}
