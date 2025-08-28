'use client';

import { HeaderLogo } from '@/widgets/header/ui/HeaderLogo';
import { useEffect, useState } from 'react';

/**
 * Apple-inspired 미니멀 로딩 컴포넌트
 */
export default function GlobalLoading() {
  const [isVisible, setIsVisible] = useState(false);
  const [dotIndex, setDotIndex] = useState(0);

  useEffect(() => {
    // 부드러운 페이드인
    const fadeTimer = setTimeout(() => setIsVisible(true), 100);

    // 점 애니메이션 (애플 스타일)
    const dotInterval = setInterval(() => {
      setDotIndex((prev) => (prev + 1) % 3);
    }, 600);

    return () => {
      clearTimeout(fadeTimer);
      clearInterval(dotInterval);
    };
  }, []);

  return (
    <div className='flex min-h-screen items-center justify-center bg-white'>
      <div
        className={`flex flex-col items-center space-y-8 transition-all duration-1000 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
      >
        {/* 로고 - HeaderLogo에서 영감을 받은 디자인 */}
        <HeaderLogo />

        {/* 애플 스타일 로딩 인디케이터 */}
        <div className='flex items-center space-x-1'>
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                index === dotIndex ? 'scale-125 bg-gray-900' : 'scale-100 bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* 심플한 메시지 */}
        <p className='text-sm font-light text-gray-500'>Loading</p>
      </div>
    </div>
  );
}
