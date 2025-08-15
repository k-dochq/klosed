import Link from 'next/link';

export default function AuthCodeErrorPage() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md space-y-8'>
        <div className='text-center'>
          <h2 className='mt-6 text-3xl font-bold text-gray-900'>인증 오류</h2>
          <p className='mt-2 text-sm text-gray-600'>
            로그인 중 문제가 발생했습니다. 다시 시도해주세요.
          </p>
        </div>
        <div className='mt-8'>
          <Link
            href='/auth/login'
            className='flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none'
          >
            다시 로그인하기
          </Link>
        </div>
      </div>
    </div>
  );
}
