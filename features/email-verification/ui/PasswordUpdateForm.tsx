'use client';

import { useState } from 'react';
import { usePasswordValidation } from '../model/usePasswordValidation';
import { usePasswordUpdate } from '../model/usePasswordUpdate';
import { PasswordInput } from './PasswordInput';
import { ErrorMessage } from './ErrorMessage';
import { SuccessMessage } from './SuccessMessage';
import { LoadingButton } from './LoadingButton';
import { type Dictionary } from 'shared/model/types';

interface PasswordUpdateFormProps {
  className?: string;
  dict: Dictionary;
}

export function PasswordUpdateForm({ className = '', dict }: PasswordUpdateFormProps) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const {
    error: validationError,
    validatePassword,
    clearError: clearValidationError,
  } = usePasswordValidation(dict);
  const {
    isLoading,
    error: updateError,
    updatePassword,
    clearError: clearUpdateError,
  } = usePasswordUpdate(dict);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 비밀번호 검증
    const validation = validatePassword(password, confirmPassword);
    if (!validation.isValid) {
      return;
    }

    // 비밀번호 업데이트
    await updatePassword(password);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (validationError) clearValidationError();
    if (updateError) clearUpdateError();
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    if (validationError) clearValidationError();
    if (updateError) clearUpdateError();
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className='text-center'>
        <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
          {dict.auth?.passwordUpdate?.title || 'Set New Password'}
        </h2>
        <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
          {dict.auth?.passwordUpdate?.description || 'Please enter your new password.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className='space-y-4'>
        <PasswordInput
          id='new-password'
          label={dict.auth?.passwordUpdate?.form?.password?.label || 'New Password'}
          placeholder={
            dict.auth?.passwordUpdate?.form?.password?.placeholder || 'Enter your new password'
          }
          value={password}
          onChange={handlePasswordChange}
          disabled={isLoading}
        />

        <PasswordInput
          id='confirm-password'
          label={dict.auth?.passwordUpdate?.form?.confirmPassword?.label || 'Confirm Password'}
          placeholder={
            dict.auth?.passwordUpdate?.form?.confirmPassword?.placeholder ||
            'Enter your password again'
          }
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          disabled={isLoading}
        />

        {(validationError || updateError) && (
          <ErrorMessage message={validationError || updateError || ''} />
        )}

        <LoadingButton
          isLoading={isLoading}
          disabled={!password || !confirmPassword}
          loadingText={dict.auth?.passwordUpdate?.buttons?.updating || 'Updating...'}
          text={dict.auth?.passwordUpdate?.buttons?.update || 'Update Password'}
        />
      </form>
    </div>
  );
}
