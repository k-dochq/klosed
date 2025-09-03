/**
 * 환율 관련 설정 및 타입 정의
 */

export interface ExchangeRate {
  from: string;
  to: string;
  rate: number;
  lastUpdated: string;
}

export interface ExchangeRateResponse {
  success: boolean;
  rates: Record<string, number>;
  base: string;
  date: string;
}

// 기본 환율 (실제 API 연동 전 임시값)
export const DEFAULT_EXCHANGE_RATES: Record<string, number> = {
  USD_THB: 35.5, // 1 USD = 35.5 THB
  USD_KRW: 1350, // 1 USD = 1350 KRW
  THB_USD: 0.028, // 1 THB = 0.028 USD
  THB_KRW: 38, // 1 THB = 38 KRW
  KRW_USD: 0.00074, // 1 KRW = 0.00074 USD
  KRW_THB: 0.026, // 1 KRW = 0.026 THB
};

/**
 * 환율 계산 함수
 */
export function calculateExchangeRate(
  amount: number,
  fromCurrency: string,
  toCurrency: string,
): number {
  if (fromCurrency === toCurrency) {
    return amount;
  }

  const rateKey = `${fromCurrency}_${toCurrency}`;
  const rate = DEFAULT_EXCHANGE_RATES[rateKey];

  if (rate) {
    return amount * rate;
  }

  // 역방향 환율이 있는 경우 역수 계산
  const reverseRateKey = `${toCurrency}_${fromCurrency}`;
  const reverseRate = DEFAULT_EXCHANGE_RATES[reverseRateKey];

  if (reverseRate) {
    return amount / reverseRate;
  }

  // 기본값 반환 (환율 정보가 없는 경우)
  return amount;
}

/**
 * 환율 정보 가져오기 (실제 API 연동 시 사용)
 */
export async function fetchExchangeRates(
  baseCurrency: string = 'USD',
): Promise<ExchangeRateResponse> {
  try {
    // 실제 API 연동 시 여기에 API 호출 로직 추가
    // const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
    // return response.json();

    // 임시로 기본값 반환
    return {
      success: true,
      rates: {
        USD: 1,
        THB: DEFAULT_EXCHANGE_RATES['USD_THB'],
        KRW: DEFAULT_EXCHANGE_RATES['USD_KRW'],
      },
      base: baseCurrency,
      date: new Date().toISOString().split('T')[0],
    };
  } catch (error) {
    console.error('Failed to fetch exchange rates:', error);
    throw new Error('환율 정보를 가져올 수 없습니다.');
  }
}
