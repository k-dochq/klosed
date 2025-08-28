'use client';

import { GoogleSignInButton } from 'features/google-auth';
import { LineSignInButton } from 'features/line-auth';
import { AppleSignInButton } from 'features/apple-auth';
import { type Locale } from 'shared/config';

interface SocialLoginSectionProps {
  locale?: Locale;
  dict?: {
    title?: string;
    google?: string;
    apple?: string;
    line?: string;
  };
}

export function SocialLoginSection({ locale, dict }: SocialLoginSectionProps) {
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
          <LineSignInButton locale={locale} className='h-12 text-sm'>
            {dict?.line || 'Continue with LINE'}
          </LineSignInButton>
        </div>

        {/* Apple */}
        <div className='w-full'>
          <AppleSignInButton className='h-12 text-sm'>
            {dict?.apple || 'Continue with Apple'}
          </AppleSignInButton>
        </div>
      </div>
    </div>
  );
}
