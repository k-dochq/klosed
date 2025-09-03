'use client';

import { useState } from 'react';
import { usePayment } from 'features/payment/model/usePayment';
import { useAirwallexPayment } from 'features/payment/model/useAirwallexPayment';
import {
  type SupportedCurrency,
  SUPPORTED_CURRENCIES,
  formatCurrency,
  validateMinAmount,
  roundToDecimalPlaces,
} from 'shared/config/currencies';
import { calculateExchangeRate } from 'shared/config/exchange-rates';

interface PaymentButtonProps {
  amount: number;
  defaultCurrency?: SupportedCurrency;
}

export function PaymentButton({ amount, defaultCurrency = 'USD' }: PaymentButtonProps) {
  const [selectedCurrency, setSelectedCurrency] = useState<SupportedCurrency>(defaultCurrency);

  const { isLoading, error, createPaymentIntent } = usePayment();
  const {
    isInitializing,
    error: airwallexError,
    redirectToCheckout,
  } = useAirwallexPayment({
    env: 'demo',
    countryCode: SUPPORTED_CURRENCIES[selectedCurrency].countryCode,
  });

  const handleCurrencyChange = (newCurrency: SupportedCurrency) => {
    setSelectedCurrency(newCurrency);
  };

  const handlePayment = async () => {
    try {
      const result = await createPaymentIntent({
        amount: convertedAmount,
        currency: selectedCurrency,
      });

      if (result?.data) {
        // Airwallex SDK를 통한 체크아웃 페이지 리다이렉트
        await redirectToCheckout(result.data);
      } else {
        throw new Error('Payment data not received');
      }
    } catch (err) {
      console.error('Payment processing error:', err);
    }
  };

  // 환율 계산된 금액 (통화별 소수점 자릿수에 맞게 반올림)
  const rawConvertedAmount = calculateExchangeRate(amount, defaultCurrency, selectedCurrency);
  const convertedAmount = roundToDecimalPlaces(rawConvertedAmount, selectedCurrency);

  const isProcessing = isLoading || isInitializing;
  const displayError = error || airwallexError;
  const currentCurrencyInfo = SUPPORTED_CURRENCIES[selectedCurrency];

  return (
    <div className='space-y-4'>
      {/* 통화 선택 */}
      <div className='space-y-2'>
        <label className='block text-sm font-medium text-gray-700'>통화 선택</label>
        <select
          value={selectedCurrency}
          onChange={(e) => handleCurrencyChange(e.target.value as SupportedCurrency)}
          disabled={isProcessing}
          className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100'
        >
          {Object.values(SUPPORTED_CURRENCIES).map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.symbol} {currency.code} - {currency.nameKo} ({currency.name})
            </option>
          ))}
        </select>
      </div>

      {/* 결제 금액 표시 */}
      <div className='rounded-lg bg-gray-50 p-3'>
        <div className='text-sm text-gray-600'>결제 금액</div>
        <div className='text-lg font-semibold text-gray-900'>
          {formatCurrency(convertedAmount, selectedCurrency)}
        </div>
        {defaultCurrency !== selectedCurrency && (
          <div className='mt-1 text-xs text-gray-500'>
            {formatCurrency(amount, defaultCurrency)} →{' '}
            {formatCurrency(convertedAmount, selectedCurrency)}
          </div>
        )}
      </div>

      {/* 결제 버튼 */}
      <button
        onClick={handlePayment}
        disabled={isProcessing}
        className='w-full rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400'
      >
        {isLoading && 'Creating payment...'}
        {isInitializing && 'Redirecting to checkout...'}
        {!isProcessing && `Pay ${formatCurrency(convertedAmount, selectedCurrency)}`}
      </button>

      {displayError && (
        <div className='rounded-md border border-red-200 bg-red-50 p-3'>
          <p className='text-sm text-red-600'>{displayError}</p>
        </div>
      )}
    </div>
  );
}
