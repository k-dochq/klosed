export function DiamondCenterpiece() {
  return (
    <div className='absolute inset-0 flex items-center justify-center'>
      <div className='relative'>
        {/* 다중 광원 배경 효과 */}
        <div className='bg-gradient-radial absolute -inset-12 rounded-full from-yellow-400/15 via-amber-400/8 to-transparent' />
        <div className='bg-gradient-radial absolute -inset-8 rounded-full from-yellow-300/10 via-transparent to-transparent' />

        {/* 메인 다이아몬드 컨테이너 */}
        <div
          className='relative border border-yellow-400/40 bg-gradient-to-br from-black/60 via-gray-900/80 to-black/60 px-10 py-6 backdrop-blur-sm sm:px-12 sm:py-8'
          style={{
            clipPath:
              'polygon(15% 0%, 85% 0%, 100% 35%, 100% 65%, 85% 100%, 15% 100%, 0% 65%, 0% 35%)',
          }}
        >
          {/* 다이아몬드 모양 글로우 효과 */}
          <div
            className='absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-transparent to-yellow-600/10'
            style={{
              clipPath:
                'polygon(15% 0%, 85% 0%, 100% 35%, 100% 65%, 85% 100%, 15% 100%, 0% 65%, 0% 35%)',
            }}
          />

          {/* 상단/하단 다이아몬드 라인 */}
          <div className='absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-yellow-400/80 to-transparent' />
          <div className='absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-yellow-400/80 to-transparent' />

          {/* 중앙 텍스트 */}
          <div className='relative z-10'>
            <h2 className='mb-2 text-center font-serif text-xl tracking-[0.25em] text-yellow-400 sm:text-2xl sm:tracking-[0.3em]'>
              BEAUTY
            </h2>
            <div className='mx-auto my-2 h-px w-3/4 bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent' />
            <p className='text-center text-[9px] tracking-[0.35em] text-yellow-300/80 sm:text-[10px] sm:tracking-[0.4em]'>
              INVITATION
            </p>
          </div>

          {/* 모서리 보석 효과 */}
          <div className='absolute top-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-yellow-400 shadow-lg shadow-yellow-400/50' />
          <div className='absolute bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-yellow-400 shadow-lg shadow-yellow-400/50' />
          <div className='absolute top-1/2 left-2 h-1 w-1 -translate-y-1/2 rounded-full bg-yellow-300 shadow-lg shadow-yellow-300/50' />
          <div className='absolute top-1/2 right-2 h-1 w-1 -translate-y-1/2 rounded-full bg-yellow-300 shadow-lg shadow-yellow-300/50' />
        </div>
      </div>
    </div>
  );
}
