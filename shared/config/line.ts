/**
 * LINE 로그인 관련 설정
 */

export const LINE_CONFIG = {
  CHANNEL_ID: process.env.LINE_CHANNEL_ID || process.env.NEXT_PUBLIC_LINE_CHANNEL_ID!,
  CHANNEL_SECRET: process.env.LINE_CHANNEL_SECRET!,

  // OAuth 엔드포인트
  AUTHORIZE_URL: 'https://access.line.me/oauth2/v2.1/authorize',
  TOKEN_URL: 'https://api.line.me/oauth2/v2.1/token',
  PROFILE_URL: 'https://api.line.me/v2/profile',

  // 기본 스코프
  DEFAULT_SCOPE: 'profile openid',
} as const;

/**
 * 콜백 URL 동적 생성
 */
export function getLineCallbackUrl(baseUrl: string): string {
  return `${baseUrl}/api/auth/line/callback`;
}

/**
 * LINE 로그인 URL 생성
 */
export function generateLineAuthUrl(callbackUrl: string, state?: string): string {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: LINE_CONFIG.CHANNEL_ID,
    redirect_uri: callbackUrl,
    scope: LINE_CONFIG.DEFAULT_SCOPE,
    ...(state && { state }),
  });

  return `${LINE_CONFIG.AUTHORIZE_URL}?${params.toString()}`;
}
