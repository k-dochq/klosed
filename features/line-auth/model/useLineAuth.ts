'use client';

import { useCallback } from 'react';
import { generateLineAuthUrl, getLineCallbackUrl } from 'shared/config';

/**
 * LINE 인증 관련 비즈니스 로직
 * Feature Layer - Model
 */
export function useLineAuth() {
  /**
   * LINE 로그인 시작
   */
  const startLineLogin = useCallback((redirectTo?: string) => {
    try {
      // 현재 URL의 base URL 생성
      const baseUrl = `${window.location.protocol}//${window.location.host}`;
      const callbackUrl = getLineCallbackUrl(baseUrl);

      // state 파라미터 생성 (보안 및 리다이렉트 처리용)
      const state = redirectTo
        ? btoa(JSON.stringify({ redirectTo, timestamp: Date.now() }))
        : undefined;

      // LINE 인증 URL 생성 및 리다이렉트
      const authUrl = generateLineAuthUrl(callbackUrl, state);
      window.location.href = authUrl;
    } catch (error) {
      console.error('LINE login initiation failed:', error);
      throw new Error('LINE 로그인을 시작할 수 없습니다.');
    }
  }, []);

  return {
    startLineLogin,
  };
}
