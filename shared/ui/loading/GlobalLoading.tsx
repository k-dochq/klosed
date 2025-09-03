import { HeaderLogo } from 'widgets/header/ui/HeaderLogo';

interface GlobalLoadingProps {
  message?: string;
}

/**
 * Apple-inspired 미니멀 로딩 컴포넌트 - 재사용 가능한 공통 컴포넌트
 */
export function GlobalLoading({ message = 'Loading' }: GlobalLoadingProps) {
  return (
    <div className='flex min-h-screen items-center justify-center bg-white'>
      <div className='flex translate-y-0 flex-col items-center space-y-8 opacity-100'>
        {/* 로고 */}
        <HeaderLogo />

        {/* CSS 애니메이션을 사용한 점 로딩 인디케이터 */}
        <div className='flex items-center space-x-1'>
          <div
            className='h-2 w-2 animate-pulse rounded-full bg-gray-900'
            style={{ animationDelay: '0s' }}
          />
          <div
            className='h-2 w-2 animate-pulse rounded-full bg-gray-900'
            style={{ animationDelay: '0.2s' }}
          />
          <div
            className='h-2 w-2 animate-pulse rounded-full bg-gray-900'
            style={{ animationDelay: '0.4s' }}
          />
        </div>

        {/* 심플한 메시지 */}
        <p className='text-sm font-light text-gray-500'>{message}</p>
      </div>
    </div>
  );
}
