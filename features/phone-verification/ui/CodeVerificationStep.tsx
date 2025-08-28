'use client';

import { Button } from 'shared/ui/button/Button';
import { VerificationCodeInput } from './VerificationCodeInput';

interface CodeVerificationStepProps {
  dict: {
    verificationCode: {
      label: string;
      placeholder: string;
      resendCode: string;
    };
    phoneInput: {
      label: string;
    };
    verifyButton: string;
  };
  verificationCode: string;
  timerFormattedTime: string;
  isTimerActive: boolean;
  onVerificationCodeChange: (code: string) => void;
  onResend: () => void;
  onBackToPhone: () => void;
  onVerify: () => void;
  isLoading?: boolean;
}

export function CodeVerificationStep({
  dict,
  verificationCode,
  timerFormattedTime,
  isTimerActive,
  onVerificationCodeChange,
  onResend,
  onBackToPhone,
  onVerify,
  isLoading = false,
}: CodeVerificationStepProps) {
  return (
    <div className='space-y-6'>
      <VerificationCodeInput
        label={dict.verificationCode.label}
        placeholder={dict.verificationCode.placeholder}
        verificationCode={verificationCode}
        timerFormattedTime={timerFormattedTime}
        isTimerActive={isTimerActive}
        resendButtonText={dict.verificationCode.resendCode}
        onVerificationCodeChange={onVerificationCodeChange}
        onResend={onResend}
        isResendLoading={isLoading}
      />

      {/* 뒤로가기 버튼 */}
      <button
        type='button'
        onClick={onBackToPhone}
        className='text-sm text-gray-600 underline hover:text-gray-900'
      >
        ← {dict.phoneInput.label} 변경
      </button>

      {/* 인증 완료 버튼 */}
      <Button
        onClick={onVerify}
        disabled={!verificationCode || isLoading}
        className='w-full bg-gray-900 py-4 text-base font-semibold text-white hover:bg-gray-800 disabled:opacity-50'
      >
        {isLoading ? 'Verifying...' : dict.verifyButton}
      </Button>
    </div>
  );
}
