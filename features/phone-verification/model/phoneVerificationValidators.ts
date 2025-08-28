/**
 * 휴대폰 인증 폼 검증 유틸리티
 *
 * 폼 입력값의 유효성을 검증하는 함수들을 제공합니다.
 */

/**
 * 휴대폰 번호 형식을 검증합니다.
 *
 * @param phoneNumber 검증할 휴대폰 번호
 * @returns 유효하면 true, 그렇지 않으면 false
 */
export function isValidPhoneNumber(phoneNumber: string): boolean {
  // 국제번호 형식 검증 (예: +82101234567)
  const phoneRegex = /^\+[1-9]\d{1,14}$/;
  return phoneRegex.test(phoneNumber);
}

/**
 * 인증 코드 형식을 검증합니다.
 *
 * @param code 검증할 인증 코드
 * @returns 유효하면 true, 그렇지 않으면 false
 */
export function isValidVerificationCode(code: string): boolean {
  // 6자리 숫자 검증
  const codeRegex = /^\d{6}$/;
  return codeRegex.test(code);
}

/**
 * 폼 입력값을 종합적으로 검증합니다.
 *
 * @param phoneNumber 휴대폰 번호
 * @param verificationCode 인증 코드 (선택적)
 * @returns 검증 결과 객체
 */
export function validatePhoneVerificationForm(
  phoneNumber: string,
  verificationCode?: string,
): {
  isValid: boolean;
  errors: {
    phoneNumber?: string;
    verificationCode?: string;
  };
} {
  const errors: { phoneNumber?: string; verificationCode?: string } = {};

  // 휴대폰 번호 검증
  if (!phoneNumber.trim()) {
    errors.phoneNumber = 'Phone number is required.';
  } else if (!isValidPhoneNumber(phoneNumber)) {
    errors.phoneNumber =
      'Please enter a valid phone number in international format (+82101234567).';
  }

  // 인증 코드 검증 (제공된 경우에만)
  if (verificationCode !== undefined) {
    if (!verificationCode.trim()) {
      errors.verificationCode = 'Verification code is required.';
    } else if (!isValidVerificationCode(verificationCode)) {
      errors.verificationCode = 'Verification code must be 6 digits.';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * 휴대폰 번호를 국제번호 형식으로 포맷팅합니다.
 *
 * @param countryCode 국가 코드 (예: '+82')
 * @param phoneNumber 휴대폰 번호 (예: '101234567')
 * @returns 국제번호 형식의 휴대폰 번호 (예: '+82101234567')
 */
export function formatPhoneNumber(countryCode: string, phoneNumber: string): string {
  // 앞에 +가 없으면 추가
  const cleanCountryCode = countryCode.startsWith('+') ? countryCode : `+${countryCode}`;

  // 번호에서 하이픈, 공백, 특수문자 제거
  const cleanPhoneNumber = phoneNumber.replace(/[\s\-\(\)]/g, '');

  return cleanCountryCode + cleanPhoneNumber;
}
