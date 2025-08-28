'use client';

import { CountryCodeSelector } from './CountryCodeSelector';

interface PhoneNumberInputProps {
  label: string;
  placeholder: string;
  selectedCountryCode: string;
  phoneNumber: string;
  onCountryCodeChange: (code: string) => void;
  onPhoneNumberChange: (number: string) => void;
}

export function PhoneNumberInput({
  label,
  placeholder,
  selectedCountryCode,
  phoneNumber,
  onCountryCodeChange,
  onPhoneNumberChange,
}: PhoneNumberInputProps) {
  return (
    <div>
      <label className='mb-2 block text-sm font-medium text-gray-700'>{label}</label>

      {/* 국가 코드 선택 및 번호 입력 */}
      <div className='relative'>
        <div className='flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3'>
          <CountryCodeSelector
            selectedCode={selectedCountryCode}
            onCodeChange={onCountryCodeChange}
          />

          {/* 구분선 */}
          <div className='h-6 w-px bg-gray-300'></div>

          {/* 휴대폰 번호 입력 */}
          <input
            type='tel'
            value={phoneNumber}
            onChange={(e) => onPhoneNumberChange(e.target.value)}
            placeholder={placeholder}
            className='flex-1 bg-transparent text-gray-900 placeholder-gray-400 outline-none'
          />
        </div>
      </div>
    </div>
  );
}
