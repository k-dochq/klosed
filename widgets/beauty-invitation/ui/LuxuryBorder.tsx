export function LuxuryBorder() {
  return (
    <div className='absolute inset-0 rounded-lg border-2 border-yellow-400/80 bg-gradient-to-br from-yellow-400/8 via-transparent to-yellow-600/8'>
      {/* 두 번째 테두리 */}
      <div className='absolute inset-2 rounded-md border border-yellow-300/40'>
        {/* 세 번째 테두리 */}
        <div className='absolute inset-2 rounded-sm border border-yellow-200/20'>
          {/* 정교한 모서리 장식 */}
          <div className='absolute -top-1 -left-1 h-8 w-8 border-t-2 border-l-2 border-yellow-400'>
            <div className='absolute top-2 left-2 h-2 w-2 border-t border-l border-yellow-300/60' />
          </div>
          <div className='absolute -top-1 -right-1 h-8 w-8 border-t-2 border-r-2 border-yellow-400'>
            <div className='absolute top-2 right-2 h-2 w-2 border-t border-r border-yellow-300/60' />
          </div>
          <div className='absolute -bottom-1 -left-1 h-8 w-8 border-b-2 border-l-2 border-yellow-400'>
            <div className='absolute bottom-2 left-2 h-2 w-2 border-b border-l border-yellow-300/60' />
          </div>
          <div className='absolute -right-1 -bottom-1 h-8 w-8 border-r-2 border-b-2 border-yellow-400'>
            <div className='absolute right-2 bottom-2 h-2 w-2 border-r border-b border-yellow-300/60' />
          </div>

          {/* 중앙 테두리 장식 라인 */}
          <div className='absolute top-0 left-1/2 h-1 w-12 -translate-x-1/2 bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent' />
          <div className='absolute bottom-0 left-1/2 h-1 w-12 -translate-x-1/2 bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent' />
          <div className='absolute top-1/2 left-0 h-12 w-1 -translate-y-1/2 bg-gradient-to-b from-transparent via-yellow-400/60 to-transparent' />
          <div className='absolute top-1/2 right-0 h-12 w-1 -translate-y-1/2 bg-gradient-to-b from-transparent via-yellow-400/60 to-transparent' />
        </div>
      </div>
    </div>
  );
}
