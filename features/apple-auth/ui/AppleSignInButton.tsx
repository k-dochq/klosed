'use client';

import { useAppleAuth } from 'features/apple-auth/model/useAppleAuth';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';

interface AppleSignInButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export function AppleSignInButton({ className = '', children }: AppleSignInButtonProps) {
  const { currentLocale } = useLocalizedRouter();
  const { signInWithApple, isLoading, error } = useAppleAuth({ locale: currentLocale });

  const handleClick = () => {
    signInWithApple();
  };

  return (
    <div className='space-y-2'>
      <button
        onClick={handleClick}
        disabled={isLoading}
        className={`flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-black px-4 py-2 text-white transition-colors hover:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${className} `}
      >
        {!isLoading && (
          <svg
            className='h-5 w-5'
            viewBox='0 0 24 24'
            fill='currentColor'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z' />
          </svg>
        )}
        {isLoading ? (
          <div className='h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-white' />
        ) : null}
        <span className='font-medium'>{children || 'Apple로 로그인'}</span>
      </button>
      {error && <p className='text-sm text-red-600'>{error}</p>}
    </div>
  );
}
