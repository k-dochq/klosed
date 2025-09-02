'use client';

import { usePayment } from '../model/usePayment';

interface PaymentButtonProps {
  amount: number;
  currency?: string;
}

export function PaymentButton({ amount, currency = 'USD' }: PaymentButtonProps) {
  const { isLoading, error, createPaymentIntent } = usePayment();

  const handlePayment = async () => {
    try {
      const result = await createPaymentIntent({ amount, currency });

      if (result?.data?.return_url) {
        // Airwallex 결제 페이지로 리다이렉트
        window.location.href = result.data.return_url;
      } else {
        throw new Error('Payment URL not received');
      }
    } catch (err) {
      console.error('Payment processing error:', err);
    }
  };

  return (
    <div className='space-y-2'>
      <button
        onClick={handlePayment}
        disabled={isLoading}
        className='rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 disabled:bg-gray-400'
      >
        {isLoading ? 'Processing...' : `Pay ${currency} ${amount}`}
      </button>

      {error && <p className='text-sm text-red-600'>{error}</p>}
    </div>
  );
}
