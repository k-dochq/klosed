import { PROTECTED_ROUTES, AUTH_CONFIG } from 'shared/config';

/**
 * 경로가 보호된 경로인지 확인
 */
export function isProtectedRoute(pathname: string, locale?: string): boolean {
  const pathWithoutLocale = locale ? pathname.replace(`/${locale}`, '') : pathname;

  return PROTECTED_ROUTES.some((route) => pathWithoutLocale.startsWith(route));
}

/**
 * 로그인 페이지 경로 생성
 */
export function getLoginPath(locale: string): string {
  return `/${locale}${AUTH_CONFIG.loginPath}`;
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
