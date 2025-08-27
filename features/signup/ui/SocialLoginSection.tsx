'use client';

import { GoogleSignInButton } from 'features/google-auth';
import { LineSignInButton } from 'features/line-auth';

interface SocialLoginSectionProps {
  onAppleLogin?: () => void;
  dict?: {
    title?: string;
    google?: string;
    apple?: string;
    line?: string;
  };
}

export function SocialLoginSection({ onAppleLogin, dict }: SocialLoginSectionProps) {
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
      <div className='space-y-3'>
        {/* Google */}
        <div className='w-full'>
          <GoogleSignInButton className='h-12 text-sm'>
            {dict?.google || 'Continue with Google'}
          </GoogleSignInButton>
        </div>

        {/* LINE */}
        <div className='w-full'>
          <LineSignInButton className='h-12 text-sm'>
            {dict?.line || 'Continue with LINE'}
          </LineSignInButton>
        </div>

        {/* Apple - 임시로 비활성화된 버튼 */}
        <button
          onClick={onAppleLogin}
          disabled
          className='flex h-12 w-full cursor-not-allowed items-center justify-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-400'
        >
          <svg className='h-5 w-5' fill='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
            <path d='M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.024C6.792 21.378 6.063 19.342 6.063 17.06c0-1.296.457-2.495 1.27-3.438-.671-.204-1.279-.548-1.739-1.016-.92-.936-1.467-2.215-1.467-3.606C4.127 5.851 7.507 2.47 11.656 2.47c4.148 0 7.529 3.38 7.529 7.53 0 1.391-.546 2.67-1.467 3.606-.46.468-1.068.812-1.739 1.016.813.943 1.27 2.142 1.27 3.438 0 2.282-.729 4.318-1.584 5.951 4.46-1.607 7.618-5.945 7.618-11.024C23.971 5.367 18.605.001 12.017.001z' />
          </svg>
          <span>{dict?.apple || 'Apple (Coming Soon)'}</span>
        </button>
      </div>
    </div>
  );
}
