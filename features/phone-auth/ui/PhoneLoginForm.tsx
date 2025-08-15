'use client';

import { useState } from 'react';
import { usePhoneAuth } from 'features/phone-auth/model/usePhoneAuth';
import { TextInput } from 'shared/ui/input/TextInput';
import { Button } from 'shared/ui/button';

interface PhoneLoginFormProps {
  onOtpSent?: (phone: string) => void;
  onSuccess?: () => void;
  className?: string;
}

export function PhoneLoginForm({ onOtpSent, className = '' }: PhoneLoginFormProps) {
  const [phone, setPhone] = useState('');
  const { sendPhoneOtp, isLoading, error, message } = usePhoneAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await sendPhoneOtp(phone);
    if (result.error) {
      return;
    }

    onOtpSent?.(phone);
  };

  const formatPhoneDisplay = (value: string) => {
    // + 기호가 있으면 그대로 유지하고 불필요한 문자만 제거
    if (value.startsWith('+')) {
      return value.replace(/[^\d+]/g, '');
    }

    // + 기호가 없으면 숫자만 추출
    const numbers = value.replace(/\D/g, '');
    return numbers;
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className='text-center'>
        <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>📱 휴대폰 로그인</h2>
        <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
          국제 휴대폰 번호로 간편하게 로그인하세요
        </p>
      </div>

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <TextInput
            label='휴대폰 번호'
            type='tel'
            value={phone}
            onChange={(value) => {
              const formatted = formatPhoneDisplay(value);
              // 국제 번호 표준에 맞춰 최대 15자리까지 허용 (+ 기호 제외)
              const numbersOnly = formatted.replace(/\D/g, '');
              if (numbersOnly.length <= 15) {
                setPhone(formatted);
              }
            }}
            placeholder='+1234567890'
            required
            disabled={isLoading}
            className='text-center text-lg tracking-wider'
          />
          <p className='mt-1 text-xs text-gray-500 dark:text-gray-400'>
            국가 코드를 포함한 국제 형식으로 입력해주세요 (예: +1234567890)
          </p>
        </div>

        {error && (
          <div className='rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-800 dark:bg-red-900/20'>
            <p className='text-sm text-red-600 dark:text-red-400'>{error}</p>
          </div>
        )}

        {message && (
          <div className='rounded-lg border border-green-200 bg-green-50 p-3 dark:border-green-800 dark:bg-green-900/20'>
            <p className='text-sm text-green-600 dark:text-green-400'>{message}</p>
          </div>
        )}

        <Button
          type='submit'
          disabled={isLoading || phone.replace(/\D/g, '').length < 8}
          className='w-full'
          size='lg'
        >
          {isLoading ? (
            <div className='flex items-center justify-center'>
              <div className='mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent' />
              인증번호 발송 중...
            </div>
          ) : (
            '인증번호 받기'
          )}
        </Button>
      </form>

      <div className='space-y-2 text-center'>
        <p className='text-xs text-gray-500 dark:text-gray-400'>
          인증번호는 문자메시지(SMS)로 발송됩니다
        </p>
        <div className='text-xs text-gray-400 dark:text-gray-500'>
          <p className='mb-1 font-medium'>국가별 번호 예시:</p>
          <p>🇺🇸 미국: +1234567890</p>
          <p>🇰🇷 한국: +821012345678</p>
          <p>🇬🇧 영국: +441234567890</p>
          <p>🇯🇵 일본: +819012345678</p>
        </div>
      </div>
    </div>
  );
}
