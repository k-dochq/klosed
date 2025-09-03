'use client';

import { useState, useCallback } from 'react';
import { init } from '@airwallex/components-sdk';
import { PaymentIntentData } from './types';

interface AirwallexConfig {
  env: 'demo' | 'prod';
  countryCode?: string;
}

export function useAirwallexPayment(config: AirwallexConfig = { env: 'demo' }) {
  const [isInitializing, setIsInitializing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const redirectToCheckout = useCallback(
    async (paymentData: PaymentIntentData) => {
      try {
        setIsInitializing(true);
        setError(null);

        // Airwallex SDK 초기화
        const { payments } = await init({
          env: config.env,
          enabledElements: ['payments'],
        });

        if (!payments) {
          throw new Error('Failed to initialize Airwallex payments');
        }

        // 체크아웃 페이지로 리다이렉트
        await payments.redirectToCheckout({
          intent_id: paymentData.id,
          client_secret: paymentData.client_secret,
          currency: paymentData.currency,
          country_code: config.countryCode || 'US',
          successUrl: `${window.location.origin}/payment/success`,
          failUrl: `${window.location.origin}/payment/fail`,
        });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to redirect to checkout';
        setError(errorMessage);
        console.error('Airwallex checkout error:', err);
      } finally {
        setIsInitializing(false);
      }
    },
    [config.env, config.countryCode],
  );

  return {
    isInitializing,
    error,
    redirectToCheckout,
  };
}
