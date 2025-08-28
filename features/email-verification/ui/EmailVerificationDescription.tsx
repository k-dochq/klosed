'use client';

interface EmailVerificationDescriptionProps {
  text: string;
}

/**
 * 이메일 인증 설명 텍스트 컴포넌트
 */
export function EmailVerificationDescription({ text }: EmailVerificationDescriptionProps) {
  return (
    <div className='text-center'>
      <p className='text-sm text-gray-600'>{text}</p>
    </div>
  );
}
