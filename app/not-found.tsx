'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4'>
      <div className='w-full max-w-md text-center'>
        {/* 404 숫자 */}
        <div className='mb-8'>
          <h1 className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-9xl font-bold text-transparent'>
            404
          </h1>
        </div>

        {/* 메시지 */}
        <div className='mb-8'>
          <h2 className='mb-4 text-2xl font-semibold text-gray-800'>Page Not Found</h2>
          <p className='leading-relaxed text-gray-600'>
            The page you requested does not exist or may have been moved.
            <br />
            Please check the URL again.
          </p>
        </div>

        {/* 버튼 */}
        <div className='flex flex-col justify-center gap-4 sm:flex-row'>
          <Link
            href='/'
            className='rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-blue-700'
          >
            Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className='rounded-lg bg-gray-200 px-6 py-3 font-medium text-gray-800 transition-colors duration-200 hover:bg-gray-300'
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
