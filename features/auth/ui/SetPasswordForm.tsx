'use client';

import { useState } from 'react';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { createClient } from 'shared/lib/supabase';
import { Button } from 'shared/ui/button';
import { Input } from 'shared/ui/input';
import { type Dictionary } from 'shared/model/types';

interface SetPasswordFormProps {
  dict: Dictionary;
}

export function SetPasswordForm({ dict }: SetPasswordFormProps) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useLocalizedRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // 비밀번호 검증
    if (!password.trim()) {
      setError(dict.auth?.passwordUpdate?.errors?.PASSWORD_REQUIRED || 'Password is required.');
      return;
    }

    if (password.length < 6) {
      setError(
        dict.auth?.passwordUpdate?.errors?.PASSWORD_TOO_SHORT ||
          'Password must be at least 6 characters.',
      );
      return;
    }

    if (password !== confirmPassword) {
      setError(dict.auth?.passwordUpdate?.errors?.PASSWORD_MISMATCH || 'Passwords do not match.');
      return;
    }

    try {
      setIsLoading(true);

      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) {
        setError(dict.auth?.passwordUpdate?.errors?.UPDATE_FAILED || 'Failed to update password.');
        return;
      }

      // 비밀번호 설정 완료 후 홈페이지로 이동
      router.push('/');
    } catch (error) {
      console.error('Password update error:', error);
      setError(dict.auth?.passwordUpdate?.errors?.UNKNOWN_ERROR || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div className='space-y-2'>
        <label htmlFor='password' className='text-sm font-medium text-gray-700'>
          {dict.auth?.passwordUpdate?.form?.password?.label || 'Password'}
        </label>
        <Input
          id='password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={
            dict.auth?.passwordUpdate?.form?.password?.placeholder || 'Enter your password'
          }
          disabled={isLoading}
          required
        />
      </div>

      <div className='space-y-2'>
        <label htmlFor='confirmPassword' className='text-sm font-medium text-gray-700'>
          {dict.auth?.passwordUpdate?.form?.confirmPassword?.label || 'Confirm Password'}
        </label>
        <Input
          id='confirmPassword'
          type='password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder={
            dict.auth?.passwordUpdate?.form?.confirmPassword?.placeholder || 'Confirm your password'
          }
          disabled={isLoading}
          required
        />
      </div>

      {error && <div className='text-sm text-red-600'>{error}</div>}

      <Button type='submit' disabled={isLoading} className='w-full'>
        {isLoading
          ? dict.auth?.passwordUpdate?.buttons?.updating || 'Updating...'
          : dict.auth?.passwordUpdate?.buttons?.update || 'Update Password'}
      </Button>
    </form>
  );
}
