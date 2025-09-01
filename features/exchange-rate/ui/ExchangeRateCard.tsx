interface ExchangeRateCardProps {
  currency: string;
  value: string;
  className?: string;
}

export function ExchangeRateCard({ currency, value, className = '' }: ExchangeRateCardProps) {
  return (
    <div className={`rounded-xl bg-gray-100 p-4 dark:bg-gray-800 ${className}`}>
      <div className='text-center'>
        <div className='text-sm font-semibold text-gray-900 dark:text-gray-100'>{currency}</div>
        <div className='mt-2 text-2xl font-bold text-gray-900 dark:text-gray-100'>{value}</div>
      </div>
    </div>
  );
}
