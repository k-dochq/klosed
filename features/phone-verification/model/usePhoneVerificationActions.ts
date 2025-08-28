import { createClient } from 'shared/lib/supabase/client';

/**
 * 휴대폰 인증 API 액션 훅
 *
 * Supabase 클라이언트 SDK를 사용하여
 * 휴대폰 인증 관련 API 호출을 담당합니다.
 */
export function usePhoneVerificationActions() {
  const supabase = createClient();

  /**
   * 휴대폰 인증 코드를 발송합니다.
   *
   * @param phoneNumber 국제번호 형식의 휴대폰 번호 (+82101234567)
   * @returns 인증 코드 발송 결과
   */
  const sendVerificationCode = async (
    phoneNumber: string,
  ): Promise<{
    success: boolean;
    error?: string;
    data?: any;
  }> => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        phone: phoneNumber,
      });

      if (error) {
        console.error('휴대폰 인증 코드 발송 실패:', error);
        return {
          success: false,
          error: error.message || 'Failed to send verification code.',
        };
      }

      console.log('휴대폰 인증 코드 발송 성공:', data);
      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error('휴대폰 인증 코드 발송 중 예기치 않은 오류:', error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : 'Server error occurred. Please try again later.',
      };
    }
  };

  /**
   * 인증 코드를 검증합니다.
   *
   * @param phoneNumber 국제번호 형식의 휴대폰 번호 (+82101234567)
   * @param verificationCode 6자리 인증 코드
   * @returns 인증 결과
   */
  const verifyPhoneCode = async (
    phoneNumber: string,
    verificationCode: string,
  ): Promise<{
    success: boolean;
    error?: string;
    data?: any;
  }> => {
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        phone: phoneNumber,
        token: verificationCode,
        type: 'phone_change',
      });

      if (error) {
        console.error('휴대폰 인증 코드 검증 실패:', error);
        return {
          success: false,
          error: error.message || 'Failed to verify verification code.',
        };
      }

      console.log('휴대폰 인증 성공:', data);
      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error('휴대폰 인증 코드 검증 중 예기치 않은 오류:', error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : 'Server error occurred. Please try again later.',
      };
    }
  };

  /**
   * 인증 코드를 재전송합니다.
   *
   * @param phoneNumber 국제번호 형식의 휴대폰 번호 (+82101234567)
   * @returns 재전송 결과
   */
  const resendVerificationCode = async (
    phoneNumber: string,
  ): Promise<{
    success: boolean;
    error?: string;
    data?: any;
  }> => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        phone: phoneNumber,
      });

      if (error) {
        console.error('인증 코드 재전송 실패:', error);
        return {
          success: false,
          error: error.message || 'Failed to resend verification code.',
        };
      }

      console.log('인증 코드 재전송 성공:', data);
      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error('인증 코드 재전송 중 오류:', error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : 'Server error occurred. Please try again later.',
      };
    }
  };

  return {
    sendVerificationCode,
    verifyPhoneCode,
    resendVerificationCode,
  };
}
