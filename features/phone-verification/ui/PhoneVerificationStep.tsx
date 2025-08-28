'use client';

import { Button } from 'shared/ui/button/Button';
import { PhoneNumberInput } from './PhoneNumberInput';

interface PhoneVerificationStepProps {
  dict: {
    phoneInput: {
      label: string;
      placeholder: string;
      sendCode: string;
    };
  };
  selectedCountryCode: string;
  phoneNumber: string;
  onCountryCodeChange: (code: string) => void;
  onPhoneNumberChange: (number: string) => void;
  onSendCode: () => void;
  isLoading?: boolean;
}

export function PhoneVerificationStep({
  dict,
  selectedCountryCode,
  phoneNumber,
  onCountryCodeChange,
  onPhoneNumberChange,
  onSendCode,
  isLoading = false,
}: PhoneVerificationStepProps) {
  return (
    <div className='space-y-6'>
      <PhoneNumberInput
        label={dict.phoneInput.label}
        placeholder={dict.phoneInput.placeholder}
        selectedCountryCode={selectedCountryCode}
        phoneNumber={phoneNumber}
        onCountryCodeChange={onCountryCodeChange}
        onPhoneNumberChange={onPhoneNumberChange}
      />

      {/* 인증 코드 전송 버튼 */}
      <Button
        onClick={onSendCode}
        disabled={!phoneNumber || isLoading}
        className='w-full bg-gray-900 py-4 text-base font-semibold text-white hover:bg-gray-800 disabled:opacity-50'
      >
        {isLoading ? 'Sending...' : dict.phoneInput.sendCode}
      </Button>
    </div>
  );
}
