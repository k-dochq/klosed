/**
 * Airwallex에서 지원하는 통화 설정
 * @see https://www.airwallex.com/docs/api#operation/createPaymentIntent
 */

export type SupportedCurrency = 'USD' | 'THB' | 'KRW';

export interface CurrencyInfo {
  code: SupportedCurrency;
  symbol: string;
  name: string;
  nameKo: string;
  countryCode: string;
  decimalPlaces: number;
  minAmount: number; // 최소 결제 금액 (해당 통화 단위)
}

export const SUPPORTED_CURRENCIES: Record<SupportedCurrency, CurrencyInfo> = {
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    nameKo: '미국 달러',
    countryCode: 'US',
    decimalPlaces: 2,
    minAmount: 0.5, // $0.50
  },
  THB: {
    code: 'THB',
    symbol: '฿',
    name: 'Thai Baht',
    nameKo: '태국 바트',
    countryCode: 'TH',
    decimalPlaces: 2,
    minAmount: 20, // ฿20
  },
  KRW: {
    code: 'KRW',
    symbol: '₩',
    name: 'Korean Won',
    nameKo: '한국 원',
    countryCode: 'KR',
    decimalPlaces: 0,
    minAmount: 100, // ₩100
  },
} as const;

/**
 * 통화별 금액 포맷팅
 */
export function formatCurrency(amount: number, currency: SupportedCurrency): string {
  const currencyInfo = SUPPORTED_CURRENCIES[currency];
  const locale = getLocaleForCurrency(currency);

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: currencyInfo.decimalPlaces,
    maximumFractionDigits: currencyInfo.decimalPlaces,
  }).format(amount);
}

/**
 * 통화별 로케일 반환
 */
function getLocaleForCurrency(currency: SupportedCurrency): string {
  switch (currency) {
    case 'USD':
      return 'en-US';
    case 'THB':
      return 'th-TH';
    case 'KRW':
      return 'ko-KR';
    default:
      return 'en-US';
  }
}

/**
 * 최소 결제 금액 검증
 */
export function validateMinAmount(amount: number, currency: SupportedCurrency): boolean {
  const currencyInfo = SUPPORTED_CURRENCIES[currency];
  return amount >= currencyInfo.minAmount;
}

/**
 * 통화별 소수점 자릿수에 맞게 금액 반올림
 */
export function roundToDecimalPlaces(amount: number, currency: SupportedCurrency): number {
  const currencyInfo = SUPPORTED_CURRENCIES[currency];
  const multiplier = Math.pow(10, currencyInfo.decimalPlaces);
  return Math.round(amount * multiplier) / multiplier;
}

/**
 * 통화별 결제 수수료 계산 (예시)
 */
export function calculateFee(amount: number, currency: SupportedCurrency): number {
  // Airwallex 수수료 구조에 따라 조정 필요
  const feeRate = 0.029; // 2.9%
  const fixedFee = currency === 'USD' ? 0.3 : currency === 'THB' ? 10 : 300;

  return amount * feeRate + fixedFee;
}
