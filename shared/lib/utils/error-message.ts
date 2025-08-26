import type { Dictionary } from 'shared/model/types';

/**
 * 초대 코드 관련 에러 코드를 다국어 메시지로 변환하는 유틸리티 함수
 * @param errorCode - 에러 코드 (예: 'INVALID_CODE', 'EXPIRED_CODE')
 * @param dict - 초대 코드 관련 다국어 딕셔너리 객체
 * @returns 다국어로 변환된 에러 메시지
 */
export function getInviteErrorMessage(errorCode?: string, dict?: Dictionary['invite']): string {
  if (!errorCode || !dict?.errors) {
    return dict?.errors?.SERVER_ERROR || 'An error occurred.';
  }

  return (
    dict.errors[errorCode as keyof typeof dict.errors] ||
    dict.errors.SERVER_ERROR ||
    'An error occurred.'
  );
}
