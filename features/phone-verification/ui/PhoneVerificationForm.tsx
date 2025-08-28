'use client';

interface PhoneVerificationFormProps {
  dict: {
    title: string;
    subtitle: string;
    phoneInput: {
      label: string;
      placeholder: string;
    };
    verifyButton: string;
    skipButton: string;
  };
  userId?: string;
  email?: string;
}

export function PhoneVerificationForm({ dict, userId, email }: PhoneVerificationFormProps) {
  const handleVerify = () => {
    // TODO: 휴대폰 인증 로직 구현
    console.log('휴대폰 인증 시작:', { userId, email });
  };

  const handleSkip = () => {
    // TODO: 건너뛰기 로직 구현
    console.log('휴대폰 인증 건너뜀:', { userId, email });
  };

  return (
    <div className='w-full max-w-md space-y-8'>
      {/* 헤더 */}
      <div className='text-center'>
        <h1 className='text-2xl font-bold text-gray-900'>{dict.title}</h1>
        <p className='mt-2 text-gray-600'>{dict.subtitle}</p>
        {email && <p className='mt-1 text-sm text-gray-500'>계정: {email}</p>}
      </div>

      {/* 휴대폰 입력 폼 */}
      <div className='space-y-6'>
        <div>
          <label className='mb-2 block text-sm font-medium text-gray-700'>
            {dict.phoneInput.label}
          </label>
          <input
            type='tel'
            placeholder={dict.phoneInput.placeholder}
            className='w-full rounded-xl border-2 border-gray-200 bg-white px-6 py-4 text-center text-lg font-medium text-gray-900 placeholder-gray-400 shadow-sm transition-all duration-200 hover:border-gray-300 focus:border-gray-400 focus:shadow-md focus:outline-none'
          />
        </div>

        {/* 버튼들 */}
        <div className='space-y-3'>
          <button
            onClick={handleVerify}
            className='w-full rounded-xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 px-6 py-4 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:from-gray-800 hover:via-gray-700 hover:to-gray-800 hover:shadow-xl active:scale-[0.98]'
          >
            {dict.verifyButton}
          </button>

          <button
            onClick={handleSkip}
            className='w-full rounded-xl border border-gray-200 bg-white px-6 py-4 text-base font-semibold text-gray-700 shadow-sm transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md active:scale-[0.98]'
          >
            {dict.skipButton}
          </button>
        </div>
      </div>

      {/* 개발 중 표시 */}
      <div className='text-center'>
        <div className='inline-block rounded-lg bg-yellow-100 px-3 py-1 text-sm text-yellow-800'>
          🚧 개발 중 - 빈껍데기 페이지
        </div>
      </div>
    </div>
  );
}
