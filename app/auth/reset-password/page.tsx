'use client';

import { PasswordResetForm } from 'features/email-auth';
import { useRouter } from 'next/navigation';

export default function ResetPasswordPage() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8 dark:bg-gray-900'>
      <div className='w-full max-w-md'>
        <PasswordResetForm
          onBack={handleBack}
          className='rounded-lg bg-white p-6 shadow-md dark:bg-gray-800'
        />
      </div>
    </div>
  );
}
