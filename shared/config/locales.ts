/**
 * 다국어 설정 - 애플리케이션의 모든 언어 관련 상수를 중앙집중식으로 관리
 */

// 지원하는 언어 목록 (타입 안전성을 위한 const assertion)
export const SUPPORTED_LOCALES = ['en', 'ko', 'th'] as const;

// Locale 타입 정의 (위 배열에서 자동 추론)
export type Locale = (typeof SUPPORTED_LOCALES)[number];

// 기본 언어 설정
export const DEFAULT_LOCALE: Locale = 'en';

// 언어 표시 레이블 (UI에서 사용)
export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  ko: '한국어',
  th: 'ไทย',
};

// 언어 풀네임 (메타데이터나 접근성을 위해 사용)
export const LOCALE_NAMES: Record<Locale, string> = {
  en: 'English',
  ko: 'Korean',
  th: 'Thai',
};

// RTL(Right-to-Left) 언어 여부 (필요시 사용)
export const LOCALE_RTL: Record<Locale, boolean> = {
  en: false,
  ko: false,
  th: false,
};

// 언어별 날짜 포맷 (필요시 사용)
export const LOCALE_DATE_FORMAT: Record<Locale, string> = {
  en: 'MM/dd/yyyy',
  ko: 'yyyy년 MM월 dd일',
  th: 'dd/MM/yyyy',
};

// Utility 함수들
export const isValidLocale = (locale: string): locale is Locale => {
  return SUPPORTED_LOCALES.includes(locale as Locale);
};

export const getLocaleName = (locale: Locale): string => {
  return LOCALE_NAMES[locale];
};

export const getLocaleLabel = (locale: Locale): string => {
  return LOCALE_LABELS[locale];
};
