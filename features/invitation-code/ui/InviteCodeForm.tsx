'use client';

import { useState } from 'react';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { useInviteCodeValidation } from 'features/invitation-code';
import { getInviteErrorMessage } from 'shared/lib';
import { LogoPlaceholder } from './LogoPlaceholder';
import { InviteTitle } from './InviteTitle';
import { InviteInstructions } from './InviteInstructions';
import { InviteCodeInput } from './InviteCodeInput';
import { NoCodeLink } from './NoCodeLink';
import { ActionButtons } from './ActionButtons';
import type { Dictionary } from 'shared/model/types';

interface InviteCodeFormProps {
  dict: Dictionary['invite'];
}

export function InviteCodeForm({ dict }: InviteCodeFormProps) {
  const [inviteCode, setInviteCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useLocalizedRouter();

  const { mutate: validateCode, isPending } = useInviteCodeValidation();

  const handleContinue = () => {
    if (!inviteCode.trim()) {
      setErrorMessage(dict.errors?.CODE_REQUIRED || 'Please enter an invitation code.');
      return;
    }

    setErrorMessage(''); // 에러 메시지 초기화
    validateCode(
      { code: inviteCode.trim() },
      {
        onSuccess: (data) => {
          if (data.success) {
            router.push('/auth/signup');
          } else {
            const errorMessage = getInviteErrorMessage(data.errorCode || 'UNKNOWN_ERROR', dict);
            setErrorMessage(errorMessage);
          }
        },
        onError: (error) => {
          const errorMessage = getInviteErrorMessage(error.message || 'UNKNOWN_ERROR', dict);
          setErrorMessage(errorMessage);
        },
      },
    );
  };

  const handleCancel = () => {
    // 취소 시 홈으로 이동
    router.push('/');
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
          onEnter={handleContinue}
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
