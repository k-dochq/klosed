import type { Dictionary } from 'shared/model/types';

export function getInviteErrorMessage(errorCode: string, dict: Dictionary['invite']): string {
  // invite.errors 객체에서 에러 코드에 해당하는 메시지 찾기
  const errorMessages = dict?.errors;

  if (errorMessages && errorCode in errorMessages) {
    return errorMessages[errorCode as keyof typeof errorMessages];
  }

  // 기본 에러 메시지
  return errorMessages?.SERVER_ERROR || 'An error occurred.';
}
