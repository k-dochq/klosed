import { type EmailErrorCode } from 'shared/config/email';
import { type Dictionary } from 'shared/model/types';

/**
 * 이메일 에러 코드를 사용자 친화적인 메시지로 변환
 *
 * @param errorCode - 이메일 에러 코드
 * @param dict - 다국어 dictionary 객체
 * @returns 사용자 친화적인 에러 메시지
 */
export function getEmailErrorMessage(
  errorCode: string | null | undefined,
  dict: Dictionary,
): string {
  if (!errorCode) {
    return dict.auth?.emailVerification?.errors?.UNKNOWN_ERROR || 'An unexpected error occurred.';
  }

  // 타입 안전성을 위해 EmailErrorCode 타입으로 변환
  const validErrorCode = errorCode as EmailErrorCode;

  // dictionary에서 해당 에러 코드의 메시지를 가져옴
  const errorMessage = dict.auth?.emailVerification?.errors?.[validErrorCode];

  // 해당 에러 코드의 메시지가 있으면 반환, 없으면 기본 메시지 반환
  if (errorMessage) {
    return errorMessage;
  }

  // 알 수 없는 에러 코드는 기본 메시지 반환
  return dict.auth?.emailVerification?.errors?.UNKNOWN_ERROR || 'An unexpected error occurred.';
}

/**
 * 이메일 에러 메시지를 가져오는 훅 (React 컴포넌트에서 사용)
 *
 * @returns 에러 메시지를 가져오는 함수
 */
export function useEmailErrorMessage() {
  // 현재는 간단하게 기본 함수를 반환하지만,
  // 나중에 React Context나 다른 상태 관리와 통합할 수 있음
  return {
    getEmailErrorMessage,
  };
}
