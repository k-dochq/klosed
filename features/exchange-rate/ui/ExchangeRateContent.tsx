import { RefreshCw } from 'lucide-react';
import { fetchExchangeRateData } from 'entities/weather/api/weather-api';
import { ExchangeRateCard } from './ExchangeRateCard';
import { ExchangeRateTitle } from './ExchangeRateTitle';
import type { Dictionary } from 'shared/model/types';

interface ExchangeRateContentProps {
  dict: Dictionary;
}

export async function ExchangeRateContent({ dict }: ExchangeRateContentProps) {
  const exchangeRateData = await fetchExchangeRateData();
  const thbToKrw = exchangeRateData.thb.krw;

  return (
    <div className='mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-6'>
      <ExchangeRateTitle dict={dict} />
      <div className='flex gap-3 sm:gap-4'>
        <ExchangeRateCard currency={dict.exchangeRate.thb} value='1' className='flex-1' />
        <ExchangeRateCard
          currency={dict.exchangeRate.krw}
          value={thbToKrw.toFixed(2)}
          className='flex-1'
        />
      </div>
    </div>
  );
}
