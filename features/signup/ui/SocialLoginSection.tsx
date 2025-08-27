'use client';

interface SocialLoginSectionProps {
  onGoogleLogin: () => void;
  onAppleLogin: () => void;
  onLineLogin: () => void;
}

export function SocialLoginSection({
  onGoogleLogin,
  onAppleLogin,
  onLineLogin,
}: SocialLoginSectionProps) {
  return (
    <div className='w-full space-y-6'>
      {/* Divider */}
      <div className='flex items-center'>
        <div className='flex-1 border-t border-gray-300'></div>
        <span className='px-4 text-sm font-semibold text-gray-500'>OR</span>
        <div className='flex-1 border-t border-gray-300'></div>
      </div>

      {/* Social Login Buttons */}
      <div className='flex justify-center space-x-4'>
        {/* Google */}
        <button
          onClick={onGoogleLogin}
          className='flex h-12 w-12 items-center justify-center rounded-full border-2 border-gray-300 bg-white shadow-sm transition-colors hover:border-gray-400'
        >
          <span className='text-lg font-bold text-gray-700'>G</span>
        </button>

        {/* Apple */}
        <button
          onClick={onAppleLogin}
          className='flex h-12 w-12 items-center justify-center rounded-full border-2 border-gray-300 bg-white shadow-sm transition-colors hover:border-gray-400'
        >
          <span className='text-lg font-bold text-gray-700'>A</span>
        </button>

        {/* Line */}
        <button
          onClick={onLineLogin}
          className='flex h-12 w-12 items-center justify-center rounded-full border-2 border-gray-300 bg-white shadow-sm transition-colors hover:border-gray-400'
        >
          <span className='text-lg font-bold text-gray-700'>L</span>
        </button>
      </div>
    </div>
  );
}
