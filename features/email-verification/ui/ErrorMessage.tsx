'use client';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className='rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-800 dark:bg-red-900/50'>
      <p className='text-sm text-red-600 dark:text-red-400'>{message}</p>
    </div>
  );
}
