'use client';

import { useGoogleAuth } from '../model/useGoogleAuth';

interface SignOutButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export function SignOutButton({ className = '', children }: SignOutButtonProps) {
  const { signOut, isLoading, error } = useGoogleAuth();

  const handleClick = () => {
    signOut();
  };

  return (
    <div className='space-y-2'>
      <button
        onClick={handleClick}
        disabled={isLoading}
        className={`rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${className} `}
      >
        {isLoading ? (
          <div className='flex items-center gap-2'>
            <div className='h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600' />
            로그아웃 중...
          </div>
        ) : (
          children || '로그아웃'
        )}
      </button>
      {error && <p className='text-sm text-red-600'>{error}</p>}
    </div>
  );
}
