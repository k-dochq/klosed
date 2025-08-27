'use client';

import { useEffect, useState } from 'react';

/**
 * 전역 로딩 컴포넌트
 * 애플 스타일의 깔끔한 로딩 화면
 */
export default function GlobalLoading() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 부드러운 등장 애니메이션
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='flex min-h-screen items-center justify-center bg-white'>
      <div
        className={`text-center transition-all duration-500 ease-out ${
          isVisible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-4 scale-95 opacity-0'
        }`}
      >
        {/* 로고 영역 */}
        <div className='mb-12'>
          <div className='mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-black shadow-2xl'>
            <svg
              className='h-10 w-10 text-white'
              fill='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z' />
            </svg>
          </div>

          {/* 브랜드명 */}
          <h1 className='text-3xl font-semibold tracking-tight text-gray-900'>Klosed</h1>
        </div>

        {/* 애플 스타일 스피너 */}
        <div className='relative mx-auto flex h-8 w-8 items-center justify-center'>
          <svg
            className='h-8 w-8 animate-spin'
            viewBox='0 0 32 32'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            {/* 배경 원 */}
            <circle
              cx='16'
              cy='16'
              r='14'
              stroke='currentColor'
              strokeWidth='2'
              className='text-gray-200'
            />
            {/* 진행 원 */}
            <circle
              cx='16'
              cy='16'
              r='14'
              stroke='currentColor'
              strokeWidth='2'
              className='text-blue-500'
              strokeDasharray='43.98'
              strokeDashoffset='43.98'
              strokeLinecap='round'
              transform='rotate(-90 16 16)'
            >
              <animateTransform
                attributeName='transform'
                attributeType='XML'
                type='rotate'
                from='-90 16 16'
                to='270 16 16'
                dur='1.5s'
                repeatCount='indefinite'
              />
            </circle>
          </svg>
        </div>

        {/* 최소한의 텍스트 */}
        <div className='mt-8'>
          <p className='text-sm font-medium tracking-wide text-gray-500'>Loading...</p>
        </div>
      </div>
    </div>
  );
}
