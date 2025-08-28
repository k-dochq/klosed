/**
 * 이메일 관련 설정 및 상수들
 */

// 이메일 발송자 정보
export const EMAIL_SENDER = {
  address: 'onboarding@resend.dev',
  displayName: 'Klosed',
  fullAddress: 'Klosed <onboarding@resend.dev>',
} as const;

// 이메일 템플릿 관련 상수들
export const EMAIL_TEMPLATES = {
  verification: {
    subject: 'Test Email from Klosed',
    senderName: 'Klosed Team',
  },
} as const;

// Resend API 설정
export const RESEND_CONFIG = {
  apiUrl: 'https://api.resend.com/emails',
  defaultFrom: EMAIL_SENDER.fullAddress,
} as const;

// 이메일 에러 코드 타입
export type EmailErrorCode =
  | 'INVALID_EMAIL_FORMAT'
  | 'EMAIL_SEND_FAILED'
  | 'UNKNOWN_ERROR'
  | 'EMAIL_ALREADY_VERIFIED'
  | 'USER_NOT_FOUND'
  | 'TOKEN_GENERATION_FAILED';
