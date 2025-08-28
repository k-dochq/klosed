'use client';

import { Button } from 'shared/ui/button/Button';

interface VerificationCodeInputProps {
  label: string;
  placeholder: string;
  verificationCode: string;
  timerFormattedTime: string;
  isTimerActive: boolean;
  resendButtonText: string;
  onVerificationCodeChange: (code: string) => void;
  onResend: () => void;
  isResendLoading?: boolean;
}

export function VerificationCodeInput({
  label,
  placeholder,
  verificationCode,
  timerFormattedTime,
  isTimerActive,
  resendButtonText,
  onVerificationCodeChange,
  onResend,
  isResendLoading = false,
}: VerificationCodeInputProps) {
  return (
    <div>
      <label className='mb-2 block text-sm font-medium text-gray-700'>{label}</label>

      {/* 인증 코드 입력 */}
      <div className='space-y-3'>
        <div className='flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3'>
          <input
            type='text'
            value={verificationCode}
            onChange={(e) => onVerificationCodeChange(e.target.value)}
            placeholder={placeholder}
            className='flex-1 bg-transparent text-gray-900 placeholder-gray-400 outline-none'
          />

          {/* 타이머 */}
          {isTimerActive && (
            <span className='text-sm font-semibold text-gray-900'>{timerFormattedTime}</span>
          )}
        </div>

        {/* 재전송 버튼 - 모바일에서는 별도 행으로 */}
        <div className='flex flex-col gap-2 sm:flex-row'>
          <Button
            onClick={onResend}
            disabled={isTimerActive || isResendLoading}
            variant='outline'
            size='sm'
            className='w-full sm:ml-auto sm:w-auto'
          >
            {isResendLoading ? 'Resending...' : resendButtonText}
          </Button>
        </div>
      </div>
    </div>
  );
}
