import Cookies from 'js-cookie';
import type { Locale } from 'shared/config';

// 쿠키 상수
const LOCALE_COOKIE_NAME = 'locale';

// 쿠키 옵션
const COOKIE_OPTIONS = {
  expires: 365, // 1년
  path: '/',
  sameSite: 'lax' as const,
} as const;

// 클라이언트용 언어 쿠키 유틸리티
export const localeCookies = {
  // 언어를 쿠키에 저장 (기존 쿠키 유지)
  set: (locale: Locale) => {
    if (typeof document === 'undefined') return;

    Cookies.set(LOCALE_COOKIE_NAME, locale, COOKIE_OPTIONS);
  },

  // 클라이언트에서 언어 쿠키 읽기
  get: (): Locale | null => {
    if (typeof document === 'undefined') return null;

    return (Cookies.get(LOCALE_COOKIE_NAME) as Locale) || null;
  },
};
