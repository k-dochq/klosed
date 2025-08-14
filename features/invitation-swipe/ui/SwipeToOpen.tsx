import { RefObject } from 'react';

interface SwipeToOpenProps {
  swipeAreaRef: RefObject<HTMLDivElement | null>;
  isDragging: boolean;
  dragProgress: number;
  isOpen: boolean;
}

export function SwipeToOpen({ swipeAreaRef, isDragging, dragProgress, isOpen }: SwipeToOpenProps) {
  return (
    <>
      {/* 스와이프 트랙 - 봉투 가로 전체 */}
      <div className='absolute top-12 right-4 left-4 flex h-10 items-center'>
        {/* 점선 트랙 (고정) */}
        <div className='absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 border-t-2 border-dashed border-yellow-400/60' />

        {/* 진행도 표시선 */}
        <div
          className='absolute top-1/2 h-0.5 -translate-y-1/2 bg-yellow-400/80 transition-all duration-100'
          style={{
            left: 0,
            width: `${dragProgress * 100}%`,
          }}
        />

        {/* 힌트 텍스트 - 중앙에 위치 */}
        {!isDragging && !isOpen && (
          <div className='absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-center'>
            <span className='animate-pulse rounded-full border border-yellow-400/30 bg-black/60 px-3 py-1 text-xs text-yellow-400 backdrop-blur-sm'>
              Swipe to Open
            </span>
          </div>
        )}
      </div>

      {/* 드래그 가능한 화살표 */}
      <div
        ref={swipeAreaRef}
        className={`absolute top-12 left-4 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        style={{
          width: '32px',
          height: '40px',
          zIndex: 20,
        }}
      >
        <div className='absolute top-1/2 left-0 -translate-y-1/2'>
          {/* 화살표 아이콘 */}
          <div className='flex h-8 w-8 items-center justify-center rounded-full border border-yellow-400/40 bg-yellow-400/30 shadow-lg backdrop-blur-sm transition-all duration-200 hover:border-yellow-400/60 hover:bg-yellow-400/40'>
            <svg
              className='h-4 w-4 text-yellow-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2.5}
                d='M14 5l7 7m0 0l-7 7m7-7H3'
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}
