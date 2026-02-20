import { AUTH_CONFIG, Locale } from 'shared/config';

/**
 * 로그인 페이지 경로 생성
 */
export function getAuthPath(locale: Locale): string {
  return `/${locale}${AUTH_CONFIG.authPath}`;
}

/**
 * 로그인 후 리다이렉트 경로 생성
 */
export function getRedirectAfterLoginPath(locale: string): string {
  return `/${locale}${AUTH_CONFIG.redirectAfterLogin}`;
}

/**
 * 로그아웃 후 리다이렉트 경로 생성
 */
export function getRedirectAfterLogoutPath(locale: string): string {
  return `/${locale}${AUTH_CONFIG.redirectAfterLogout}`;
}
