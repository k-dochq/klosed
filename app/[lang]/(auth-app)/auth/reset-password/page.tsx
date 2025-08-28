import { Suspense } from 'react';
import { PasswordUpdateForm } from 'features/email-verification/ui/PasswordUpdateForm';
import { getDictionary } from 'app/[lang]/dictionaries';
import { type Locale } from 'shared/config/locales';

interface PageProps {
  params: Promise<{
    lang: Locale;
  }>;
}

export default async function ResetPasswordPage({ params }: PageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className='mx-auto min-h-screen max-w-[500px]'>
      <Suspense fallback={<div>Loading...</div>}>
        <div className='flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8 dark:bg-gray-900'>
          <div className='w-full max-w-md'>
            <PasswordUpdateForm
              dict={dict}
              className='rounded-lg bg-white p-6 shadow-md dark:bg-gray-800'
            />
          </div>
        </div>
      </Suspense>
    </div>
  );
}
