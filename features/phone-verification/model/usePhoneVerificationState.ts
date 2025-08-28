import { useState } from 'react';
import { DEFAULT_COUNTRY_CODE } from 'shared/config';

export type PhoneVerificationStep = 'phone' | 'verification';

export interface PhoneVerificationState {
  step: PhoneVerificationStep;
  phoneNumber: string;
  verificationCode: string;
  selectedCountryCode: string;
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
}

/**
 * 휴대폰 인증 폼 상태 관리 훅
 *
 * 폼의 모든 상태를 중앙에서 관리하며,
 * 상태 변경 로직을 제공합니다.
 */
export function usePhoneVerificationState() {
  const [step, setStep] = useState<PhoneVerificationStep>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [selectedCountryCode, setSelectedCountryCode] = useState(DEFAULT_COUNTRY_CODE);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  /**
   * 폼 상태를 초기화합니다.
   */
  const resetForm = () => {
    setPhoneNumber('');
    setVerificationCode('');
    setError(null);
    setSuccessMessage(null);
  };

  /**
   * 다음 단계로 이동합니다.
   */
  const nextStep = () => {
    setStep('verification');
  };

  /**
   * 이전 단계로 이동합니다.
   */
  const prevStep = () => {
    setStep('phone');
    setVerificationCode('');
    setError(null);
    setSuccessMessage(null);
  };

  /**
   * 로딩 상태를 설정합니다.
   */
  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  /**
   * 에러 메시지를 설정합니다.
   */
  const setErrorMessage = (message: string | null) => {
    setError(message);
    if (message) {
      setSuccessMessage(null); // 에러가 있으면 성공 메시지 제거
    }
  };

  /**
   * 성공 메시지를 설정합니다.
   */
  const setSuccess = (message: string | null) => {
    setSuccessMessage(message);
    if (message) {
      setError(null); // 성공 메시지가 있으면 에러 제거
    }
  };

  /**
   * 폼 전체를 초기화합니다.
   */
  const resetAll = () => {
    setStep('phone');
    setPhoneNumber('');
    setVerificationCode('');
    setSelectedCountryCode(DEFAULT_COUNTRY_CODE);
    setIsLoading(false);
    setError(null);
    setSuccessMessage(null);
  };

  return {
    // 상태
    state: {
      step,
      phoneNumber,
      verificationCode,
      selectedCountryCode,
      isLoading,
      error,
      successMessage,
    },

    // 액션
    actions: {
      setPhoneNumber,
      setVerificationCode,
      setSelectedCountryCode,
      setLoading,
      setErrorMessage,
      setSuccess,
      nextStep,
      prevStep,
      resetForm,
      resetAll,
    },
  };
}
