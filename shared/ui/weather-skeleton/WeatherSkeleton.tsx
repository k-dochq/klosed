export function WeatherSkeleton() {
  return (
    <div className='mx-auto max-w-md px-4 py-6'>
      {/* 타이틀 스켈레톤 */}
      <div className='mb-6'>
        <div className='mb-2 h-8 animate-pulse rounded bg-gray-300'></div>
        <div className='h-6 animate-pulse rounded bg-gray-200'></div>
      </div>

      {/* 날씨 카드 스켈레톤 */}
      <div className='rounded-3xl bg-gray-200 p-6'>
        <div className='flex items-center justify-between'>
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className='flex flex-col items-center space-y-3'>
              {/* 아이콘 스켈레톤 */}
              <div className='h-12 w-12 animate-pulse rounded-full bg-gray-300'></div>

              {/* 텍스트 스켈레톤 */}
              <div className='space-y-1 text-center'>
                <div className='h-4 w-12 animate-pulse rounded bg-gray-300'></div>
                <div className='h-3 w-8 animate-pulse rounded bg-gray-200'></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
