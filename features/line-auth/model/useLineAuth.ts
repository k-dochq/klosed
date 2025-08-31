'use client';

import { useState, useCallback } from 'react';
import { DEFAULT_LOCALE, LINE_CONFIG } from 'shared/config';
import { type Locale } from 'shared/config';

interface LineAuthState {
  isLoading: boolean;
  error: string | null;
}

interface UseLineAuthProps {
  locale?: Locale;
}

/**
 * LINE 로그인 훅
 * LINE OAuth 2.0 플로우를 직접 구현하고 Supabase와 통합
 */
export function useLineAuth({ locale }: UseLineAuthProps = {}) {
  const [state, setState] = useState<LineAuthState>({
    isLoading: false,
    error: null,
  });

  /**
   * LINE 로그인 시작
   * LINE OAuth 인증 페이지로 리다이렉트
   */
  const startLineLogin = useCallback(() => {
    try {
      setState({ isLoading: true, error: null });

      // 현재 도메인 기반 콜백 URL 생성 (locale 제거)
      const baseUrl = `${window.location.protocol}//${window.location.host}`;
      const redirectUri = `${baseUrl}/auth/line/callback`;

      // CSRF 방지를 위한 state 생성
      const state = btoa(
        JSON.stringify({
          timestamp: Date.now(),
          nonce: Math.random().toString(36).substring(2, 15),
          locale: locale || DEFAULT_LOCALE,
          redirectUri: redirectUri, // 생성한 redirect_uri를 state에 저장
        }),
      );

      // LINE 인증 URL 생성
      const authUrl = new URL(LINE_CONFIG.AUTHORIZE_URL);
      authUrl.searchParams.set('response_type', 'code');
      authUrl.searchParams.set('client_id', LINE_CONFIG.CHANNEL_ID);
      authUrl.searchParams.set('redirect_uri', redirectUri);
      authUrl.searchParams.set('state', state);
      authUrl.searchParams.set('scope', LINE_CONFIG.DEFAULT_SCOPE);

      // LINE 인증 페이지로 리다이렉트
      window.location.href = authUrl.toString();
    } catch (error) {
      console.error('LINE login initiation failed:', error);
      setState({
        isLoading: false,
        error: 'LINE 로그인을 시작할 수 없습니다.',
      });
    }
  }, [locale]);

  return {
    ...state,
    startLineLogin,
  };
}
