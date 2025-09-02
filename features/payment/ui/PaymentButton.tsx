'use client';

import { usePayment } from '../model/usePayment';
import { useAirwallexPayment } from '../model/useAirwallexPayment';

interface PaymentButtonProps {
  amount: number;
  currency?: string;
}

export function PaymentButton({ amount, currency = 'USD' }: PaymentButtonProps) {
  const { isLoading, error, createPaymentIntent } = usePayment();
  const {
    isInitializing,
    error: airwallexError,
    redirectToCheckout,
  } = useAirwallexPayment({
    env: 'demo',
    countryCode: 'US',
  });

  const handlePayment = async () => {
    try {
      const result = await createPaymentIntent({ amount, currency });

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

  const isProcessing = isLoading || isInitializing;
  const displayError = error || airwallexError;

  return (
    <div className='space-y-2'>
      <button
        onClick={handlePayment}
        disabled={isProcessing}
        className='rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 disabled:bg-gray-400'
      >
        {isLoading && 'Creating payment...'}
        {isInitializing && 'Redirecting to checkout...'}
        {!isProcessing && `Pay ${currency} ${amount}`}
      </button>

      {displayError && <p className='text-sm text-red-600'>{displayError}</p>}
    </div>
  );
}
