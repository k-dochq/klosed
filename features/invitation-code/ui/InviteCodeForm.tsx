'use client';

import { useState } from 'react';
import { useInviteCodeValidation } from 'features/invitation-code';
import { LogoPlaceholder } from './LogoPlaceholder';
import { InviteTitle } from './InviteTitle';
import { InviteInstructions } from './InviteInstructions';
import { InviteCodeInput } from './InviteCodeInput';
import { NoCodeLink } from './NoCodeLink';
import { ActionButtons } from './ActionButtons';

interface InviteCodeFormProps {
  dict: {
    title: string;
    instructions: {
      line1: string;
      line2: string;
    };
    input: {
      placeholder: string;
    };
    noCode: string;
    buttons: {
      cancel: string;
      continue: string;
    };
  };
}

export function InviteCodeForm({ dict }: InviteCodeFormProps) {
  const [inviteCode, setInviteCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { mutate: validateCode, isPending } = useInviteCodeValidation();

  const handleContinue = () => {
    if (!inviteCode.trim()) {
      setErrorMessage('초대 코드를 입력해주세요.');
      return;
    }

    setErrorMessage(''); // 에러 메시지 초기화
    validateCode(
      { code: inviteCode.trim() },
      {
        onSuccess: (data) => {
          if (data.success) {
            console.log('초대 코드 검증 성공:', data.inviteCode);
            // TODO: 성공 시 다음 단계로 이동 (예: 회원가입 페이지)
            alert('초대 코드가 유효합니다!');
          } else {
            setErrorMessage(data.message);
          }
        },
        onError: (error) => {
          setErrorMessage(error.message || '초대 코드 검증에 실패했습니다.');
        },
      },
    );
  };

  const handleCancel = () => {
    // TODO: 취소 로직 (예: 홈으로 리다이렉트)
    console.log('Cancel clicked');
  };

  return (
    <div className='flex w-full flex-col items-center space-y-10 pb-24'>
      <LogoPlaceholder />
      <div className='space-y-4'>
        <InviteTitle title={dict.title} />
        <InviteInstructions instructions={dict.instructions} />
      </div>
      <div className='w-full space-y-6'>
        <InviteCodeInput
          placeholder={dict.input.placeholder}
          value={inviteCode}
          onChange={setInviteCode}
        />
        {errorMessage && <div className='text-center text-sm text-red-600'>{errorMessage}</div>}
        <NoCodeLink text={dict.noCode} />
      </div>
      <ActionButtons
        buttons={dict.buttons}
        onCancel={handleCancel}
        onContinue={handleContinue}
        isLoading={isPending}
      />
    </div>
  );
}
