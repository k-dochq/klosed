export const LINE_CONFIG = {
  CHANNEL_ID: process.env.LINE_CHANNEL_ID || process.env.NEXT_PUBLIC_LINE_CHANNEL_ID || '',
  CHANNEL_SECRET: process.env.LINE_CHANNEL_SECRET || '',
  AUTHORIZE_URL: 'https://access.line.me/oauth2/v2.1/authorize',
  TOKEN_URL: 'https://api.line.me/oauth2/v2.1/token',
  PROFILE_URL: 'https://api.line.me/v2/profile',
  DEFAULT_SCOPE: 'profile openid email',
} as const;

export const LINE_ERROR_CODES = {
  INVALID_REQUEST: 'INVALID_REQUEST',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
} as const;
