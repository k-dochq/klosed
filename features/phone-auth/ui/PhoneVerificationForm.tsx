'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { usePhoneAuth, maskPhoneNumber } from 'features/phone-auth/model/usePhoneAuth';
import { Button } from 'shared/ui/button';

interface PhoneVerificationFormProps {
  phone: string;
  onBack?: () => void;
  onSuccess?: () => void;
  redirectTo?: string;
  className?: string;
}

export function PhoneVerificationForm({
  phone,
  onBack,
  onSuccess,
  redirectTo = '/',
  className = '',
}: PhoneVerificationFormProps) {
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(300); // 5분 = 300초
  const router = useRouter();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { verifyPhoneOtp, resendOtp, isLoading, error, message } = usePhoneAuth();

  // 타이머 효과
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // 첫 번째 입력 필드에 자동 포커스
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleOtpChange = (index: number, value: string) => {
    // 숫자만 허용
    if (!/^\d*$/.test(value)) return;

    const newOtpCode = [...otpCode];
    newOtpCode[index] = value;
    setOtpCode(newOtpCode);

    // 자동으로 다음 필드로 이동
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    // 백스페이스로 이전 필드로 이동
    if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '');

    if (pastedData.length === 6) {
      const newOtpCode = pastedData.split('');
      setOtpCode(newOtpCode);
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = otpCode.join('');
    if (token.length !== 6) {
      return;
    }

    const result = await verifyPhoneOtp(phone, token);
    if (result.error) {
      // 실패 시 OTP 입력 필드 초기화
      setOtpCode(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
      return;
    }

    // 성공 시 처리
    onSuccess?.();
    router.push(redirectTo);
  };

  const handleResend = async () => {
    await resendOtp(phone);
    setTimeLeft(300); // 타이머 리셋
    setOtpCode(['', '', '', '', '', '']); // OTP 입력 초기화
    inputRefs.current[0]?.focus();
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const isCodeComplete = otpCode.every((digit) => digit !== '');

  return (
    <div className={`space-y-6 ${className}`}>
      <div className='text-center'>
        <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>📨 인증번호 입력</h2>
        <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
          <span className='font-medium'>{maskPhoneNumber(phone)}</span>으로
          <br />
          발송된 6자리 인증번호를 입력해주세요
        </p>
      </div>

      <form onSubmit={handleSubmit} className='space-y-6'>
        {/* OTP 입력 필드 */}
        <div className='flex justify-center space-x-3'>
          {otpCode.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type='text'
              inputMode='numeric'
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              disabled={isLoading}
              className='h-14 w-12 rounded-lg border-2 border-gray-300 bg-white text-center text-xl font-bold text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-blue-800'
              autoComplete='off'
            />
          ))}
        </div>

        {/* 타이머 */}
        <div className='text-center'>
          {timeLeft > 0 ? (
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              남은 시간:{' '}
              <span className='font-mono font-bold text-blue-600 dark:text-blue-400'>
                {formatTime(timeLeft)}
              </span>
            </p>
          ) : (
            <p className='text-sm text-red-600 dark:text-red-400'>
              인증시간이 만료되었습니다. 새로운 인증번호를 요청해주세요.
            </p>
          )}
        </div>

        {error && (
          <div className='rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-800 dark:bg-red-900/20'>
            <p className='text-center text-sm text-red-600 dark:text-red-400'>{error}</p>
          </div>
        )}

        {message && (
          <div className='rounded-lg border border-green-200 bg-green-50 p-3 dark:border-green-800 dark:bg-green-900/20'>
            <p className='text-center text-sm text-green-600 dark:text-green-400'>{message}</p>
          </div>
        )}

        {/* 버튼들 */}
        <div className='space-y-3'>
          <Button
            type='submit'
            disabled={!isCodeComplete || isLoading || timeLeft <= 0}
            className='w-full'
            size='lg'
          >
            {isLoading ? (
              <div className='flex items-center justify-center'>
                <div className='mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent' />
                인증 중...
              </div>
            ) : (
              '인증하기'
            )}
          </Button>

          <div className='flex space-x-3'>
            <Button
              type='button'
              variant='outline'
              onClick={handleResend}
              disabled={isLoading || timeLeft > 240} // 1분 후부터 재전송 가능
              className='flex-1'
            >
              인증번호 재전송
            </Button>

            {onBack && (
              <Button
                type='button'
                variant='outline'
                onClick={onBack}
                disabled={isLoading}
                className='flex-1'
              >
                이전으로
              </Button>
            )}
          </div>
        </div>
      </form>

      <div className='text-center'>
        <p className='text-xs text-gray-500 dark:text-gray-400'>
          인증번호가 오지 않나요?
          <br />
          스팸함을 확인하거나 잠시 후 다시 시도해주세요
          <br />
          <span className='text-gray-400'>국제 번호는 수신까지 시간이 걸릴 수 있습니다</span>
        </p>
      </div>
    </div>
  );
}
