import { RefreshCw } from 'lucide-react';
import type { Dictionary } from 'shared/model/types';

interface ExchangeRateTitleProps {
  dict: Dictionary;
}

export function ExchangeRateTitle({ dict }: ExchangeRateTitleProps) {
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC',
  });

  return (
    <div className='mb-4 flex items-center justify-between'>
      <h2 className='text-foreground text-lg font-semibold'>{dict.exchangeRate.title}</h2>
      <div className='text-muted-foreground flex items-center gap-2 text-sm'>
        <span>{currentTime} UTC</span>
        <RefreshCw className='h-4 w-4' />
      </div>
    </div>
  );
}
