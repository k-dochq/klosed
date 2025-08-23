import { type NextRequest } from 'next/server';
import { type Locale, isValidLocale, DEFAULT_LOCALE } from 'shared/config';

/**
 * Accept-Language 헤더를 기준으로 locale을 감지합니다.
 * 지원되지 않는 언어인 경우 기본 locale을 반환합니다.
 *
 * @param request - Next.js 요청 객체
 * @returns 감지된 locale 또는 기본 locale
 */
export function getLocale(request: NextRequest): Locale {
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage.split(',')[0].split('-')[0].toLowerCase();
    if (isValidLocale(preferredLocale)) {
      return preferredLocale;
    }
  }

  return DEFAULT_LOCALE;
}
