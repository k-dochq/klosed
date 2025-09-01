import { Suspense } from 'react';
import { ExchangeRateSkeleton } from './ExchangeRateSkeleton';
import { ExchangeRateContent } from './ExchangeRateContent';
import type { Dictionary } from 'shared/model/types';

interface ExchangeRateProps {
  dict: Dictionary;
}

export function ExchangeRate({ dict }: ExchangeRateProps) {
  return (
    <Suspense fallback={<ExchangeRateSkeleton />}>
      <ExchangeRateContent dict={dict} />
    </Suspense>
  );
}
