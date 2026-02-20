import { PROTECTED_ROUTES } from 'shared/config/auth';
import { SUPPORTED_LOCALES, type Locale } from 'shared/config/locales';

/**
 * 경로에서 locale을 제거하고 순수한 경로만 추출
 */
function extractPathWithoutLocale(pathname: string): string {
  // pathname 형태: /ko/my/profile -> my/profile
  // pathname 형태: /en/dashboard -> dashboard
  const segments = pathname.split('/').filter(Boolean);

  // 첫 번째 세그먼트가 실제 locale인지 확인
  if (segments.length > 0 && SUPPORTED_LOCALES.includes(segments[0] as Locale)) {
    // locale이 확인되면 제거하고 나머지 경로 반환
    return segments.slice(1).join('/');
  }

  // locale이 없으면 전체 경로 반환
  return segments.join('/');
}

/**
 * 주어진 경로가 보호된 경로인지 확인
 * @param pathname - 전체 경로 (locale 포함)
 * @returns 보호된 경로 여부
 */
export function isProtectedRoute(pathname: string): boolean {
  const pathWithoutLocale = extractPathWithoutLocale(pathname);

  // PROTECTED_ROUTES의 각 경로와 비교
  return PROTECTED_ROUTES.some((route) => {
    const cleanRoute = route.startsWith('/') ? route.slice(1) : route;
    return pathWithoutLocale.startsWith(cleanRoute);
  });
}

/**
 * 경로에서 locale을 추출 (검증됨)
 * @param pathname - 전체 경로
 * @returns 유효한 locale 또는 null
 */
export function extractLocaleFromPathname(pathname: string): Locale | null {
  const segments = pathname.split('/').filter(Boolean);

  // 첫 번째 세그먼트가 실제 locale인지 확인
  if (segments.length > 0 && SUPPORTED_LOCALES.includes(segments[0] as Locale)) {
    return segments[0] as Locale;
  }

  return null;
}
