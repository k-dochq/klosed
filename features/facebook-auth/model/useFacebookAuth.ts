'use client';

import { useState } from 'react';
import { createClient } from 'shared/lib/supabase/client';

interface FacebookAuthState {
  loading: boolean;
  error: string | null;
}

export function useFacebookAuth() {
  const [state, setState] = useState<FacebookAuthState>({
    loading: false,
    error: null,
  });
  const supabase = createClient();

  const signInWithFacebook = async () => {
    try {
      setState({ loading: true, error: null });

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          scopes: 'email,public_profile',
        },
      });

      if (error) {
        console.error('Facebook OAuth Error:', error);
        setState({ loading: false, error: `Facebook 로그인 오류: ${error.message}` });
        return;
      }

      // OAuth 리디렉션이 발생하므로 loading 상태는 유지
    } catch (error) {
      setState({
        loading: false,
        error: error instanceof Error ? error.message : 'Facebook 로그인 중 오류가 발생했습니다.',
      });
    }
  };

  const signOut = async () => {
    try {
      setState({ loading: true, error: null });

      const { error } = await supabase.auth.signOut();

      if (error) {
        setState({ loading: false, error: error.message });
        return;
      }

      setState({ loading: false, error: null });
    } catch (error) {
      setState({
        loading: false,
        error: error instanceof Error ? error.message : '로그아웃 중 오류가 발생했습니다.',
      });
    }
  };

  return {
    ...state,
    signInWithFacebook,
    signOut,
  };
}
