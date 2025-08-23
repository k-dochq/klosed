'use client';

import { useLineAuth } from 'features/line-auth/model/useLineAuth';

interface LineSignInButtonProps {
  /**
   * 버튼의 추가 CSS 클래스
   */
  className?: string;
  /**
   * 버튼 텍스트 (기본값: "LINE으로 로그인")
   */
  children?: React.ReactNode;
}

/**
 * LINE 로그인 버튼 컴포넌트
 * Feature Layer - UI
 */
export function LineSignInButton({
  className = '',
  children = 'LINE으로 로그인',
}: LineSignInButtonProps) {
  const { startLineLogin, isLoading, error } = useLineAuth();
  return (
    <div>
      <button
        type='button'
        onClick={startLineLogin}
        disabled={isLoading}
        className={`flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 ${className}`.trim()}
      >
        {/* LINE 로고 */}
        <svg width='20' height='20' viewBox='0 0 24 24' fill='none' className='flex-shrink-0'>
          <path
            d='M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771z'
            fill='#00B900'
          />
          <path
            d='M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314'
            fill='#00B900'
          />
        </svg>
        {isLoading ? '로그인 중...' : children}
      </button>
      {error && <p className='mt-2 text-sm text-red-600 dark:text-red-400'>{error}</p>}
    </div>
  );
}
