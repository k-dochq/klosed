import { type Locale } from 'shared/config';

/**
 * Airwallex에서 지원하는 locale로 변환
 * 태국어는 지원하지 않으므로 영어로 변환
 */
export function getAirwallexLocale(locale: Locale): AirwallexLocale {
  switch (locale) {
    case 'ko':
      return 'ko';
    case 'en':
      return 'en';
    case 'th':
      return 'en'; // 태국어는 지원하지 않으므로 영어로 변환
    default:
      return 'en';
  }
}

/**
 * Airwallex locale 타입 (실제 지원되는 locale들)
 */
export type AirwallexLocale = 'ko' | 'en';

/**
 * Locale이 Airwallex에서 지원되는지 확인
 */
export function isSupportedAirwallexLocale(locale: string): locale is AirwallexLocale {
  return locale === 'ko' || locale === 'en';
}
