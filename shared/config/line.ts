/**
 * LINE 로그인 관련 설정
 */

export const LINE_CONFIG = {
  CHANNEL_ID: process.env.LINE_CHANNEL_ID || process.env.NEXT_PUBLIC_LINE_CHANNEL_ID!,
  CHANNEL_SECRET: process.env.LINE_CHANNEL_SECRET!,

  // OAuth 엔드포인트
  AUTHORIZE_URL: 'https://access.line.me/oauth2/v2.1/authorize',
  TOKEN_URL: 'https://api.line.me/oauth2/v2.1/token',
  PROFILE_URL: 'https://api.line.me/v2/profile  ',

  // 기본 스코프
  DEFAULT_SCOPE: 'profile openid email',
} as const;
