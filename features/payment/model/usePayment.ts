'use client';

import { useMutation } from '@tanstack/react-query';
import { PaymentRequest, PaymentResponse } from './types';

async function createPaymentIntentAPI(
  request: Omit<PaymentRequest, 'requestUrl'>,
): Promise<PaymentResponse> {
  const requestWithUrl: PaymentRequest = {
    ...request,
    requestUrl: window.location.href,
  };

  const response = await fetch('/api/payment-intents', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestWithUrl),
  });

  const data: PaymentResponse = await response.json();

  if (!response.ok || !data.success) {
    throw new Error('Payment creation failed');
  }

  return data;
}

export function usePayment() {
  const mutation = useMutation({
    mutationFn: createPaymentIntentAPI,
    onError: (error) => {
      console.error('Payment creation error:', error);
    },
  });

  return {
    isLoading: mutation.isPending,
    error: mutation.error?.message || null,
    createPaymentIntent: mutation.mutateAsync,
  };
}
