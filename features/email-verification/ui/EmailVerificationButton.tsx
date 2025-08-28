'use client';

interface EmailVerificationButtonProps {
  disabled: boolean;
  isProcessing: boolean;
  isSending: boolean;
  text: string;
  processingText: string;
  sendingText: string;
}

/**
 * 이메일 인증 버튼 컴포넌트
 */
export function EmailVerificationButton({
  disabled,
  isProcessing,
  isSending,
  text,
  processingText,
  sendingText,
}: EmailVerificationButtonProps) {
  const getButtonText = () => {
    if (isProcessing) return processingText;
    if (isSending) return sendingText;
    return text;
  };

  return (
    <button
      type='submit'
      disabled={disabled}
      className='w-full rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
    >
      {getButtonText()}
    </button>
  );
}
