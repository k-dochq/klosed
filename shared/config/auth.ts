// 보호된 경로 설정
export const PROTECTED_ROUTES = ['/my'] as const;

// 공개 경로 설정 (인증이 필요하지 않은 경로)
export const PUBLIC_ROUTES = [
  '/',
  '/auth/login',
  '/auth/signup',
  '/auth/forgot-password',
  '/about',
  '/contact',
] as const;

// 인증 관련 설정
export const AUTH_CONFIG = {
  authPath: '/auth/invite',
  loginPath: '/auth/login',
  signupPath: '/auth/signup',
  forgotPasswordPath: '/auth/forgot-password',
  redirectAfterLogin: '/dashboard',
  redirectAfterLogout: '/',
} as const;

// Passwordless 인증용 기본 패스워드
export const PASSWORDLESS_AUTH_PASSWORD = 'passwordless-auth' as const;
