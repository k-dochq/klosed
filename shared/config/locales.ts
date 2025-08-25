export const SUPPORTED_LOCALES = ['en', 'ko', 'th'] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'th';

export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  ko: '한국어',
  th: 'ไทย',
};

export const isValidLocale = (locale: string): locale is Locale => {
  return SUPPORTED_LOCALES.includes(locale as Locale);
};
