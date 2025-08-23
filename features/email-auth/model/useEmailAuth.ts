'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from 'shared/lib/supabase';

export function useEmailAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const supabase = createClient();
  const router = useRouter();

  const signInWithEmail = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      setMessage(null);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      setMessage('로그인에 성공했습니다!');

      router.push('/');

      return { data, error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '로그인 중 오류가 발생했습니다.';
      setError(errorMessage);
      return { data: null, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const signUpWithEmail = async (email: string, password: string, redirectTo?: string) => {
    try {
      setIsLoading(true);
      setError(null);
      setMessage(null);

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectTo || `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        throw error;
      }

      setMessage('회원가입이 완료되었습니다! 이메일을 확인해주세요.');
      return { data, error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '회원가입 중 오류가 발생했습니다.';
      setError(errorMessage);
      return { data: null, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setMessage(null);

      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }

      setMessage('로그아웃되었습니다.');
      return { error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '로그아웃 중 오류가 발생했습니다.';
      setError(errorMessage);
      return { error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setIsLoading(true);
      setError(null);
      setMessage(null);

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) {
        throw error;
      }

      setMessage('비밀번호 재설정 이메일을 발송했습니다.');
      return { error: null };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : '비밀번호 재설정 중 오류가 발생했습니다.';
      setError(errorMessage);
      return { error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signInWithEmail,
    signUpWithEmail,
    signOut,
    resetPassword,
    isLoading,
    error,
    message,
  };
}
