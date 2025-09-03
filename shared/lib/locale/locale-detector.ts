import 'server-only';

import { DEFAULT_LOCALE, SUPPORTED_LOCALES, type Locale, isValidLocale } from 'shared/config';
import { NextRequest } from 'next/server';

export function getLocaleFromRequest(request: NextRequest): Locale {
  const acceptLanguage = request.headers.get('accept-language');

  if (acceptLanguage) {
    // 가장 우선순위 높은 언어 코드 추출 (예: 'ko,en;q=0.9')
    const primaryLang = acceptLanguage.split(',')[0].split('-')[0];

    // 지원되는 locale인지 확인하고 반환
    if (isValidLocale(primaryLang)) {
      return primaryLang;
    }
  }

  // 지원되지 않는 locale이거나 accept-language가 없는 경우 기본 locale 반환
  return DEFAULT_LOCALE;
}
