import { SUPPORTED_LOCALES, DEFAULT_LOCALE, type Locale } from 'shared/config';

/**
 * 경로에서 로케일을 추출하는 함수
 * 미들웨어에서 사용
 */
export function extractLocaleFromPath(pathname: string): Locale {
  const pathnameParts = pathname.split('/');
  const extractedLocale = pathnameParts[1];

  if (extractedLocale && SUPPORTED_LOCALES.includes(extractedLocale as Locale)) {
    return extractedLocale as Locale;
  }

  return DEFAULT_LOCALE;
}

/**
 * 경로에 로케일이 포함되어 있는지 확인하는 함수
 */
export function hasLocaleInPath(pathname: string): boolean {
  const pathnameParts = pathname.split('/');
  const extractedLocale = pathnameParts[1];

  return extractedLocale ? SUPPORTED_LOCALES.includes(extractedLocale as Locale) : false;
}
