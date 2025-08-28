'use client';

import { useState } from 'react';
import { type Dictionary } from 'shared/model/types';

interface PasswordValidationResult {
  isValid: boolean;
  error: string | null;
}

export function usePasswordValidation(dict: Dictionary) {
  const [error, setError] = useState<string | null>(null);

  const validatePassword = (
    password: string,
    confirmPassword: string,
  ): PasswordValidationResult => {
    if (!password || !confirmPassword) {
      const errorMessage =
        dict.auth?.passwordUpdate?.errors?.PASSWORD_REQUIRED || 'Please enter a password.';
      setError(errorMessage);
      return { isValid: false, error: errorMessage };
    }

    if (password !== confirmPassword) {
      const errorMessage =
        dict.auth?.passwordUpdate?.errors?.PASSWORD_MISMATCH || 'Passwords do not match.';
      setError(errorMessage);
      return { isValid: false, error: errorMessage };
    }

    if (password.length < 6) {
      const errorMessage =
        dict.auth?.passwordUpdate?.errors?.PASSWORD_TOO_SHORT ||
        'Password must be at least 6 characters long.';
      setError(errorMessage);
      return { isValid: false, error: errorMessage };
    }

    setError(null);
    return { isValid: true, error: null };
  };

  const clearError = () => {
    setError(null);
  };

  return {
    error,
    validatePassword,
    clearError,
  };
}
