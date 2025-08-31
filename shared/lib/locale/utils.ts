import { SUPPORTED_LOCALES, DEFAULT_LOCALE, type Locale } from 'shared/config';
import type { NextRequest } from 'next/server';

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
 * NextRequest에서 쿠키로 로케일을 추출하는 유틸리티 함수
 * 서버 사이드에서 사용 (API routes, middleware 등)
 *
 * @param request - NextRequest 객체
 * @returns 유효한 로케일 또는 null
 */
export function extractLocaleFromCookie(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get('locale')?.value;

  if (cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale as Locale)) {
    return cookieLocale as Locale;
  }

  return DEFAULT_LOCALE;
}
