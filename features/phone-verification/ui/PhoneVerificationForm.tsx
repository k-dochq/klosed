'use client';

import { useState } from 'react';
import { DEFAULT_COUNTRY_CODE } from 'shared/config';
import { useTimer } from '../model/useTimer';
import { PhoneVerificationStep } from './PhoneVerificationStep';
import { CodeVerificationStep } from './CodeVerificationStep';

interface PhoneVerificationFormProps {
  dict: {
    title: string;
    subtitle: string;
    phoneInput: {
      label: string;
      placeholder: string;
      sendCode: string;
    };
    verificationCode: {
      label: string;
      placeholder: string;
      resendCode: string;
    };
    verifyButton: string;
    skipButton: string;
    continueButton: string;
  };
  userId?: string;
  email?: string;
}

export function PhoneVerificationForm({ dict, userId, email }: PhoneVerificationFormProps) {
  const [step, setStep] = useState<'phone' | 'verification'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [selectedCountryCode, setSelectedCountryCode] = useState(DEFAULT_COUNTRY_CODE);

  const timer = useTimer({
    initialTime: 180,
    onComplete: () => {
      // 타이머 완료 시 처리
    },
  });

  const handleSendCode = () => {
    // TODO: 인증 코드 전송 로직 구현
    console.log('인증 코드 전송:', { phoneNumber: selectedCountryCode + phoneNumber });
    setStep('verification');
    timer.startTimer();
  };

  const handleVerify = () => {
    // TODO: 휴대폰 인증 로직 구현
    console.log('휴대폰 인증 시작:', {
      userId,
      email,
      phoneNumber: selectedCountryCode + phoneNumber,
      verificationCode,
    });
  };

  const handleSkip = () => {
    // TODO: 건너뛰기 로직 구현
    console.log('휴대폰 인증 건너뜀:', { userId, email });
  };

  const handleResend = () => {
    // TODO: 재전송 로직 구현
    console.log('인증 코드 재전송:', { phoneNumber: selectedCountryCode + phoneNumber });
    timer.startTimer();
  };

  const handleBackToPhone = () => {
    setStep('phone');
    setVerificationCode('');
    timer.stopTimer();
  };

  return (
    <div className='flex min-h-screen flex-col bg-white'>
      {/* 메인 콘텐츠 */}
      <div className='flex flex-1 flex-col items-center justify-center px-6'>
        <div className='w-full max-w-md space-y-8'>
          {/* 아이콘 플레이스홀더 */}
          <div className='flex justify-center'>
            <div className='h-16 w-16 rounded-full bg-gray-200'></div>
          </div>

          {/* 환영 메시지 */}
          <div className='text-center'>
            <h1 className='text-2xl font-bold text-gray-900'>{dict.title}</h1>
            <p className='mt-2 text-lg font-semibold text-gray-900'>{dict.subtitle}</p>
          </div>

          {step === 'phone' ? (
            <PhoneVerificationStep
              dict={dict}
              selectedCountryCode={selectedCountryCode}
              phoneNumber={phoneNumber}
              onCountryCodeChange={setSelectedCountryCode}
              onPhoneNumberChange={setPhoneNumber}
              onSendCode={handleSendCode}
            />
          ) : (
            <CodeVerificationStep
              dict={dict}
              verificationCode={verificationCode}
              timerFormattedTime={timer.formattedTime}
              isTimerActive={timer.isActive}
              onVerificationCodeChange={setVerificationCode}
              onResend={handleResend}
              onBackToPhone={handleBackToPhone}
              onVerify={handleVerify}
            />
          )}
        </div>
      </div>

      {/* 건너뛰기 버튼 */}
      <div className='px-6 pb-8'>
        <button
          type='button'
          onClick={handleSkip}
          className='w-full py-2 text-center text-sm text-gray-600 underline hover:text-gray-900'
        >
          {dict.skipButton}
        </button>
      </div>
    </div>
  );
}
