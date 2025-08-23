import Link from 'next/link';
import { type Locale } from 'shared/config';

interface AuthLinksProps {
  locale: Locale;
  links: {
    forgotPassword: string;
    noAccount: string;
    signUp: string;
    backHome: string;
  };
}

export function AuthLinks({ locale, links }: AuthLinksProps) {
  return (
    <div className='space-y-2 text-center'>
      <Link
        href={`/${locale}/auth/reset-password`}
        className='text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300'
      >
        {links.forgotPassword}
      </Link>
      <div className='space-x-2'>
        <span className='text-sm text-gray-600 dark:text-gray-400'>{links.noAccount}</span>
        <Link
          href={`/${locale}/auth/email-login`}
          className='text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300'
        >
          {links.signUp}
        </Link>
      </div>
      <div>
        <Link
          href={`/${locale}`}
          className='text-sm text-gray-600 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300'
        >
          {links.backHome}
        </Link>
      </div>
    </div>
  );
}
