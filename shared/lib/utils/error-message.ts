import type { Dictionary } from 'shared/model/types';

/**
 * 초대 코드 관련 에러 메시지를 반환하는 함수 (utils 버전)
 */
export function getInviteErrorMessage(errorCode?: string, dict?: Dictionary['invite']): string {
  if (!dict) {
    return 'An error occurred';
  }

  switch (errorCode) {
    case 'INVALID_CODE':
      return dict.errors.INVALID_CODE;
    case 'EXPIRED_CODE':
      return dict.errors.EXPIRED_CODE;
    case 'ALREADY_USED':
      return dict.errors.MAX_USES_EXCEEDED;
    case 'SUCCESS':
      return dict.success;
    case 'ERROR':
      return dict.errors.SERVER_ERROR;
    default:
      return dict.errors.SERVER_ERROR;
  }
}
