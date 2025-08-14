export function DiamondSeal() {
  return (
    <div className='absolute bottom-16 left-1/2 -translate-x-1/2'>
      <div className='relative'>
        {/* 메인 다이아몬드 씰 */}
        <div className='flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400/20 via-yellow-500/30 to-yellow-600/20 shadow-2xl backdrop-blur-sm'>
          <div className='flex h-12 w-12 items-center justify-center rounded-full border border-yellow-400/40 bg-gradient-to-br from-black/60 via-gray-900/80 to-black/60'>
            {/* 다이아몬드 아이콘 */}
            <div className='relative'>
              <div
                className='h-6 w-6'
                style={{
                  clipPath: 'polygon(50% 0%, 80% 35%, 50% 100%, 20% 35%)',
                  background:
                    'linear-gradient(135deg, rgba(255,215,0,0.9) 0%, rgba(255,193,7,0.7) 50%, rgba(255,215,0,0.9) 100%)',
                }}
              >
                {/* 다이아몬드 내부 반사 */}
                <div
                  className='absolute inset-1'
                  style={{
                    clipPath: 'polygon(50% 10%, 70% 40%, 50% 90%, 30% 40%)',
                    background:
                      'linear-gradient(45deg, rgba(255,255,255,0.3) 0%, transparent 50%, rgba(255,255,255,0.2) 100%)',
                  }}
                />
              </div>

              {/* 다이아몬드 주변 작은 보석들 */}
              <div className='absolute -top-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-yellow-300 shadow-sm' />
              <div className='absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-yellow-300 shadow-sm' />
              <div className='absolute top-1/2 -left-1 h-0.5 w-0.5 -translate-y-1/2 rounded-full bg-yellow-400' />
              <div className='absolute top-1/2 -right-1 h-0.5 w-0.5 -translate-y-1/2 rounded-full bg-yellow-400' />
            </div>
          </div>
        </div>

        {/* 화려한 주변 반짝임 효과 */}
        <div className='absolute -inset-3 rounded-full bg-yellow-400/15 blur-xl' />
        <div className='absolute -top-2 left-3 h-1.5 w-1.5 animate-pulse rounded-full bg-yellow-200 shadow-lg shadow-yellow-200/50' />
        <div className='absolute top-4 -right-2 h-1 w-1 rounded-full bg-yellow-300 shadow-md shadow-yellow-300/40' />
        <div className='absolute right-3 -bottom-2 h-1.5 w-1.5 animate-pulse rounded-full bg-yellow-200 shadow-lg shadow-yellow-200/50' />
        <div className='absolute bottom-4 -left-2 h-1 w-1 rounded-full bg-yellow-300 shadow-md shadow-yellow-300/40' />
        <div className='absolute top-1 right-1 h-0.5 w-0.5 rounded-full bg-yellow-100' />
        <div className='absolute bottom-1 left-1 h-0.5 w-0.5 rounded-full bg-yellow-100' />
      </div>
    </div>
  );
}
