'use client';

import { useState } from 'react';
import { useEmailAuth } from 'features/email-auth/model/useEmailAuth';
import { useSendVerificationEmail } from './useSendVerificationEmail';
import { generateRandomPassword } from 'shared/lib/utils/password-generator';

/**
 * 이메일 인증을 위한 회원가입 + 이메일 전송 통합 훅
 *
 * @returns 회원가입 및 이메일 전송 관련 상태 및 함수들
 */
export function useEmailVerificationSignup() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { signUpWithEmail } = useEmailAuth();
  const sendVerificationEmail = useSendVerificationEmail();

  /**
   * 이메일로 회원가입 후 이메일 인증 메일을 전송합니다.
   *
   * @param email - 사용자 이메일
   * @returns 처리 결과
   */
  const processEmailVerification = async (email: string) => {
    try {
      setIsProcessing(true);
      setError(null);

      // 1. 난수 비밀번호 생성
      const randomPassword = generateRandomPassword();

      // 2. Supabase 회원가입 호출
      const signUpResult = await signUpWithEmail(email, randomPassword);

      if (signUpResult.error) {
        console.error('회원가입 실패:', signUpResult.error);
        // 회원가입 실패 시에도 이메일 전송은 시도 (이미 가입된 경우)
      }

      // 3. 이메일 전송 (직접 mutation 함수 호출)
      const result = await sendVerificationEmail.mutateAsync({ email });

      if (result.success) {
        return { success: true, messageId: result.message };
      } else {
        return { success: false };
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '처리 중 오류가 발생했습니다.';
      setError(errorMessage);
      console.error('이메일 인증 처리 중 오류:', error);
      return { success: false };
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    processEmailVerification,
    isProcessing,
    error,
  };
}
