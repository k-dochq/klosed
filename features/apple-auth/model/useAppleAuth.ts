'use client';

import { useState } from 'react';
import { createClient } from 'shared/lib/supabase';
import type { Locale } from 'shared/config';

interface UseAppleAuthOptions {
  locale: Locale;
}

export function useAppleAuth(options: UseAppleAuthOptions) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentLocale = options.locale;

  const supabase = createClient();

  const signInWithApple = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'apple',
        options: {
          redirectTo: `${window.location.origin}/${currentLocale}/auth/callback`,
        },
      });

      if (error) {
        throw error;
      }

      return { data, error: null };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Apple 로그인 중 오류가 발생했습니다.';
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

      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }

      return { error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '로그아웃 중 오류가 발생했습니다.';
      setError(errorMessage);
      return { error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signInWithApple,
    signOut,
    isLoading,
    error,
  };
}
