// 보호된 경로 설정
export const PROTECTED_ROUTES = ['/my'] as const;

// 인증 관련 설정
export const AUTH_CONFIG = {
  authPath: '/auth/onboarding',
  signupPath: '/auth/signup',
  phoneVerificationPath: '/auth/phone-verification',
  emailVerificationSentPath: '/auth/email-verification-sent',
  existingAccountLoginPath: '/auth/existing-account-login',
  invitePath: '/auth/invite',
  setPasswordPath: '/auth/set-password',
  redirectAfterLogin: '/',
  redirectAfterLogout: '/',
} as const;

// Passwordless 인증용 기본 패스워드
export const PASSWORDLESS_AUTH_PASSWORD = 'passwordless-auth' as const;
