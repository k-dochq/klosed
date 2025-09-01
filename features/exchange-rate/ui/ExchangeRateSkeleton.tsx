export function ExchangeRateSkeleton() {
  return (
    <div className='mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-6'>
      <div className='mb-4 flex items-center justify-between'>
        <div className='h-6 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-700' />
        <div className='flex items-center gap-2'>
          <div className='h-4 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-700' />
          <div className='h-4 w-4 animate-pulse rounded bg-gray-200 dark:bg-gray-700' />
        </div>
      </div>
      <div className='flex gap-3 sm:gap-4'>
        <div className='flex-1 rounded-xl bg-gray-100 p-4 dark:bg-gray-800'>
          <div className='text-center'>
            <div className='mx-auto h-4 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-700' />
            <div className='mx-auto mt-2 h-8 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-700' />
          </div>
        </div>
        <div className='flex-1 rounded-xl bg-gray-100 p-4 dark:bg-gray-800'>
          <div className='text-center'>
            <div className='mx-auto h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700' />
            <div className='mx-auto mt-2 h-8 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-700' />
          </div>
        </div>
      </div>
    </div>
  );
}
