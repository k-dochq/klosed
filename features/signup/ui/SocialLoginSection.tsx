'use client';

interface SocialLoginSectionProps {
  onGoogleLogin: () => void;
  onAppleLogin: () => void;
  onLineLogin: () => void;
  dict?: {
    title?: string;
    google?: string;
    apple?: string;
    line?: string;
  };
}

export function SocialLoginSection({
  onGoogleLogin,
  onAppleLogin,
  onLineLogin,
  dict,
}: SocialLoginSectionProps) {
  return (
    <div className='w-full space-y-6'>
      {/* Simple Divider */}
      <div className='relative flex items-center'>
        <div className='flex-1 border-t border-gray-300'></div>
        <span className='bg-white px-4 text-sm text-gray-500'>
          {dict?.title || 'Or continue with'}
        </span>
        <div className='flex-1 border-t border-gray-300'></div>
      </div>

      {/* Clean Social Login Buttons */}
      <div className='grid grid-cols-3 gap-3'>
        {/* Google */}
        <button
          onClick={onGoogleLogin}
          className='flex flex-col items-center space-y-2 rounded-lg border border-gray-300 bg-white p-4 transition-colors hover:border-gray-400 hover:bg-gray-50'
        >
          <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100'>
            <span className='text-lg font-semibold text-gray-700'>G</span>
          </div>
          <span className='text-xs text-gray-600'>{dict?.google || 'Google'}</span>
        </button>

        {/* Apple */}
        <button
          onClick={onAppleLogin}
          className='flex flex-col items-center space-y-2 rounded-lg border border-gray-300 bg-white p-4 transition-colors hover:border-gray-400 hover:bg-gray-50'
        >
          <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100'>
            <span className='text-lg font-semibold text-gray-700'></span>
          </div>
          <span className='text-xs text-gray-600'>{dict?.apple || 'Apple'}</span>
        </button>

        {/* Line */}
        <button
          onClick={onLineLogin}
          className='flex flex-col items-center space-y-2 rounded-lg border border-gray-300 bg-white p-4 transition-colors hover:border-gray-400 hover:bg-gray-50'
        >
          <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100'>
            <span className='text-sm font-semibold text-gray-700'>LINE</span>
          </div>
          <span className='text-xs text-gray-600'>{dict?.line || 'LINE'}</span>
        </button>
      </div>
    </div>
  );
}
