'use client';

import { useState } from 'react';
import { useEmailAuth } from 'features/email-auth/model/useEmailAuth';
import { useLocalizedRouter } from 'shared/model/hooks/useLocalizedRouter';
import { createClient } from 'shared/lib/supabase/client';
import { generateRandomPassword } from 'shared/lib/utils/password-generator';
import { EMAIL_VERIFICATION_ERROR_CODES } from '../api/entities/types';

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
  const supabase = createClient();

  /**
   * 이메일로 회원가입 후 이메일 인증 메일을 전송합니다.
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

      // 2. Supabase 회원가입 호출
      const signUpResult = await signUpWithEmail(email, randomPassword);

      if (signUpResult.error) {
        console.error('회원가입 실패:', signUpResult.error);
        throw new Error(signUpResult.error);
      }

      // 3. Supabase SDK를 사용한 비밀번호 재설정 이메일 전송
      const currentHost = window.location.origin;
      const currentLocale = router.currentLocale;
      const redirectTo = `${currentHost}/${currentLocale}/auth/reset-password`;

      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo,
      });

      if (error) {
        console.error('비밀번호 재설정 이메일 전송 실패:', error.message);
        setErrorCode(EMAIL_VERIFICATION_ERROR_CODES.EMAIL_SEND_FAILED);
        return { success: false };
      }

      console.log('비밀번호 재설정 이메일 전송 성공:', data);
      return { success: true };
    } catch (error) {
      console.error('이메일 인증 처리 중 오류:', error);
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
