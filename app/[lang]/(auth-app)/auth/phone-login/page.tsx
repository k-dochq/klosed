'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { PhoneLoginForm, PhoneVerificationForm } from 'features/phone-auth';

export default function PhoneLoginPage() {
  const [step, setStep] = useState<'phone' | 'verify'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleOtpSent = (phone: string) => {
    setPhoneNumber(phone);
    setStep('verify');
  };

  const handleBack = () => {
    setStep('phone');
  };

  const handleSuccess = () => {
    // 성공 시 리다이렉트는 PhoneVerificationForm에서 처리
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 dark:from-gray-900 dark:to-gray-800'>
      <div className='w-full max-w-md'>
        {/* 뒤로가기 버튼 */}
        <div className='mb-6'>
          <Link
            href='/auth/login'
            className='inline-flex items-center text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
          >
            <ArrowLeft className='mr-1 h-4 w-4' />
            다른 방법으로 로그인
          </Link>
        </div>

        {/* 메인 카드 */}
        <div className='rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-800'>
          {step === 'phone' ? (
            <PhoneLoginForm onOtpSent={handleOtpSent} />
          ) : (
            <PhoneVerificationForm
              phone={phoneNumber}
              onBack={handleBack}
              onSuccess={handleSuccess}
            />
          )}
        </div>

        {/* 추가 정보 */}
        <div className='mt-6 text-center'>
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            처음 방문하시나요?{' '}
            <Link
              href='/auth/email-login'
              className='font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300'
            >
              이메일로 회원가입
            </Link>
          </p>
        </div>

        {/* 진행 상태 표시 */}
        <div className='mt-8 flex justify-center space-x-2'>
          <div
            className={`h-3 w-3 rounded-full ${step === 'phone' ? 'bg-blue-600' : 'bg-green-500'}`}
          />
          <div
            className={`h-3 w-3 rounded-full ${
              step === 'verify' ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
            }`}
          />
        </div>
        <div className='mt-2 text-center'>
          <p className='text-xs text-gray-500 dark:text-gray-400'>
            {step === 'phone' ? '1단계: 휴대폰 번호 입력' : '2단계: 인증번호 확인'}
          </p>
        </div>
      </div>
    </div>
  );
}
