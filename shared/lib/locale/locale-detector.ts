import { DEFAULT_LOCALE, type Locale } from 'shared/config';

/**
 * 브라우저 환경에서 사용자의 선호 언어를 감지하는 함수
 */
export function getLocale(): Locale {
  if (typeof window === 'undefined') {
    return DEFAULT_LOCALE;
  }

  // 브라우저 언어 설정 확인
  const browserLocale = navigator.language || navigator.languages?.[0];

  if (browserLocale) {
    // 언어 코드만 추출 (예: 'ko-KR' -> 'ko')
    const languageCode = browserLocale.split('-')[0];

    // 지원되는 언어인지 확인
    if (languageCode === 'ko') return 'ko';
    if (languageCode === 'en') return 'en';
    if (languageCode === 'th') return 'th';
  }

  return DEFAULT_LOCALE;
}
