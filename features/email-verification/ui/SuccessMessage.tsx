'use client';

interface SuccessMessageProps {
  title: string;
  description: string;
}

export function SuccessMessage({ title, description }: SuccessMessageProps) {
  return (
    <div className='text-center'>
      <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100'>
        <svg
          className='h-8 w-8 text-green-600'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
        </svg>
      </div>
      <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>{title}</h2>
      <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>{description}</p>
    </div>
  );
}
