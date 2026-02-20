'use client';

import { useState } from 'react';
import { useEmailAuth } from 'features/email-auth/model/useEmailAuth';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { generateRandomPassword } from 'shared/lib/utils/password-generator';
import { EMAIL_VERIFICATION_ERROR_CODES } from 'features/email-verification/api/entities/types';

/**
 * 이메일 인증을 위한 회원가입 + 이메일 전송 통합 훅
 *
 * @returns 회원가입 및 이메일 전송 관련 상태 및 함수들
 */
export function useEmailVerificationSignup() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorCode, setErrorCode] = useState<string | null>(null);

  const { signUpWithEmail } = useEmailAuth();
  const router = useLocalizedRouter();

  /**
   * 이메일로 회원가입을 진행합니다.
   *
   * @param email - 사용자 이메일
   * @returns 처리 결과
   */
  const processEmailVerification = async (email: string) => {
    try {
      setIsProcessing(true);
      setErrorCode(null);

      // 1. 난수 비밀번호 생성
      const randomPassword = generateRandomPassword();

      // 2. Supabase 회원가입 호출 (비밀번호 설정 페이지로 리다이렉트)
      const currentHost = window.location.origin;
      const currentLocale = router.currentLocale;
      const redirectTo = `${currentHost}/${currentLocale}/auth/set-password`;

      const signUpResult = await signUpWithEmail(email, randomPassword, redirectTo);

      if (signUpResult.error) {
        console.error('회원가입 실패:', signUpResult.error);
        throw new Error(signUpResult.error);
      }

      console.log('회원가입 성공');
      return { success: true };
    } catch (error) {
      console.error('회원가입 처리 중 오류:', error);
      setErrorCode(EMAIL_VERIFICATION_ERROR_CODES.UNKNOWN_ERROR);
      return { success: false };
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    processEmailVerification,
    isProcessing,
    errorCode,
  };
}
