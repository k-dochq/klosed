import { Smartphone } from 'lucide-react';
import Link from 'next/link';
import { type Locale } from 'shared/config';

interface PhoneLoginButtonProps {
  locale: Locale;
  title: string;
  buttonText: string;
}

export function PhoneLoginButton({ locale, title, buttonText }: PhoneLoginButtonProps) {
  return (
    <div className='space-y-4'>
      <h3 className='text-center text-lg font-medium text-gray-900 dark:text-white'>{title}</h3>
      <Link
        href={`/${locale}/auth/phone-login`}
        className='flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
      >
        <Smartphone className='h-5 w-5' />
        {buttonText}
      </Link>
    </div>
  );
}
