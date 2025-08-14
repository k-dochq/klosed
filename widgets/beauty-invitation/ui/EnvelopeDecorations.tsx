export function EnvelopeDecorations() {
  return (
    <>
      {/* 화려한 하단 장식 */}
      <div className='absolute right-0 bottom-8 left-0'>
        <div className='flex items-center justify-center space-x-3'>
          {/* 왼쪽 장식 라인 */}
          <div className='flex items-center space-x-1'>
            <div className='h-px w-8 bg-gradient-to-r from-transparent to-yellow-400/60' />
            <div className='h-0.5 w-0.5 rounded-full bg-yellow-400/70' />
            <div className='h-px w-4 bg-yellow-400/50' />
          </div>

          {/* 중앙 다이아몬드 */}
          <div className='relative'>
            <div className='h-3 w-3 rotate-45 bg-gradient-to-br from-yellow-400/80 to-yellow-600/60 shadow-lg shadow-yellow-400/40' />
            <div className='absolute inset-0.5 rotate-45 bg-yellow-300/40' />
          </div>

          {/* 오른쪽 장식 라인 */}
          <div className='flex items-center space-x-1'>
            <div className='h-px w-4 bg-yellow-400/50' />
            <div className='h-0.5 w-0.5 rounded-full bg-yellow-400/70' />
            <div className='h-px w-8 bg-gradient-to-l from-transparent to-yellow-400/60' />
          </div>
        </div>
      </div>
    </>
  );
}
