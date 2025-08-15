'use client';

import { useState } from 'react';
import { createClient } from 'shared/lib/supabase';

export function usePhoneAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isOtpSent, setIsOtpSent] = useState(false);

  const supabase = createClient();

  // 휴대폰 번호로 OTP 전송
  const sendPhoneOtp = async (phone: string) => {
    try {
      setIsLoading(true);
      setError(null);
      setMessage(null);

      // 국제 형식으로 변환 (+ 기호가 없으면 추가)
      const formattedPhone = formatPhoneNumber(phone);
      if (!formattedPhone) {
        throw new Error('올바른 휴대폰 번호를 입력해주세요. (예: +1234567890)');
      }

      const { data, error } = await supabase.auth.signInWithOtp({
        phone: formattedPhone,
      });

      if (error) {
        throw error;
      }

      setIsOtpSent(true);
      setMessage('인증번호가 발송되었습니다. 문자를 확인해주세요.');
      return { data, error: null };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : '인증번호 발송 중 오류가 발생했습니다.';
      setError(errorMessage);
      return { data: null, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // OTP 코드 검증
  const verifyPhoneOtp = async (phone: string, token: string) => {
    try {
      setIsLoading(true);
      setError(null);
      setMessage(null);

      const formattedPhone = formatPhoneNumber(phone);
      if (!formattedPhone) {
        throw new Error('올바른 휴대폰 번호를 입력해주세요.');
      }

      if (!token || token.length !== 6) {
        throw new Error('6자리 인증번호를 입력해주세요.');
      }

      const { data, error } = await supabase.auth.verifyOtp({
        phone: formattedPhone,
        token,
        type: 'sms',
      });

      if (error) {
        throw error;
      }

      setMessage('로그인에 성공했습니다!');
      setIsOtpSent(false);
      return { data, error: null };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : '인증번호 확인 중 오류가 발생했습니다.';
      setError(errorMessage);
      return { data: null, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // 휴대폰 번호 재전송
  const resendOtp = async (phone: string) => {
    return await sendPhoneOtp(phone);
  };

  // 초기화
  const resetState = () => {
    setError(null);
    setMessage(null);
    setIsOtpSent(false);
  };

  return {
    sendPhoneOtp,
    verifyPhoneOtp,
    resendOtp,
    resetState,
    isLoading,
    error,
    message,
    isOtpSent,
  };
}

// 국제 휴대폰 번호 형식으로 변환하는 헬퍼 함수
function formatPhoneNumber(phone: string): string | null {
  // 공백과 특수문자 제거하되 + 기호는 유지
  const cleanedPhone = phone.replace(/[\s\-\(\)\.]/g, '');

  // 이미 +로 시작하는 경우
  if (cleanedPhone.startsWith('+')) {
    // +와 숫자만 있는지 확인하고, 최소 8자리 이상인지 검증
    const numbersOnly = cleanedPhone.substring(1);
    if (/^\d{8,15}$/.test(numbersOnly)) {
      return cleanedPhone;
    }
    return null;
  }

  // +가 없는 경우, 숫자만 추출
  const numbersOnly = cleanedPhone.replace(/\D/g, '');

  // 최소 8자리, 최대 15자리 (국제 표준)
  if (/^\d{8,15}$/.test(numbersOnly)) {
    return '+' + numbersOnly;
  }

  return null;
}

// 휴대폰 번호 마스킹 헬퍼 함수 (국제 번호 지원)
export function maskPhoneNumber(phone: string): string {
  // +로 시작하는 국제 번호인 경우
  if (phone.startsWith('+')) {
    if (phone.length <= 6) return phone;

    // 국가 코드 + 처음 2자리 + **** + 마지막 3자리
    const countryCodeEnd = phone.length <= 10 ? 3 : 4; // 국가 코드 길이 추정
    const start = phone.substring(0, countryCodeEnd + 2);
    const end = phone.substring(phone.length - 3);
    const maskLength = phone.length - start.length - end.length;
    const mask = '*'.repeat(Math.max(maskLength, 3));

    return `${start}${mask}${end}`;
  }

  // 일반 번호인 경우
  if (phone.length <= 6) return phone;
  const start = phone.substring(0, 3);
  const end = phone.substring(phone.length - 3);
  const maskLength = phone.length - 6;
  const mask = '*'.repeat(Math.max(maskLength, 3));

  return `${start}${mask}${end}`;
}
