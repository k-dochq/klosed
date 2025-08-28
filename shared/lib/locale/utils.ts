import { SUPPORTED_LOCALES, DEFAULT_LOCALE, type Locale } from 'shared/config';

/**
 * pathname에서 로케일을 추출하는 유틸리티 함수
 * 클라이언트 사이드에서 사용 (usePathname 등)
 *
 * @param pathname - Next.js pathname (예: /en/auth/callback)
 * @returns 유효한 로케일 또는 기본 로케일
 */
export function extractLocaleFromPathname(pathname: string): Locale {
  const pathnameParts = pathname.split('/');
  const extractedLocale = pathnameParts[1];

  // 추출된 로케일이 유효한지 확인
  if (extractedLocale && SUPPORTED_LOCALES.includes(extractedLocale as Locale)) {
    return extractedLocale as Locale;
  }

  return DEFAULT_LOCALE;
}

/**
 * request.url에서 로케일을 추출하는 유틸리티 함수
 * 서버 사이드에서 사용 (API routes, middleware 등)
 *
 * @param requestUrl - Request URL (예: https://example.com/en/auth/callback)
 * @returns 유효한 로케일 또는 기본 로케일
 */
export function extractLocaleFromRequestUrl(requestUrl: string): Locale {
  const url = new URL(requestUrl);
  const pathnameParts = url.pathname.split('/');
  const extractedLocale = pathnameParts[1];

  // 추출된 로케일이 유효한지 확인
  if (extractedLocale && SUPPORTED_LOCALES.includes(extractedLocale as Locale)) {
    return extractedLocale as Locale;
  }

  return DEFAULT_LOCALE;
}
