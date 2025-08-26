import { NextRequest } from 'next/server';
import { z } from 'zod';
import {
  inviteCodeSchema,
  InviteCodeValidationService,
  formatSuccessResponse,
  formatErrorResponse,
} from 'shared/lib';
import { INVITE_CODE_ERROR_CODES } from 'shared/config/error-codes';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Zod를 사용한 입력 검증
    const { code } = inviteCodeSchema.parse(body);

    // 초대 코드 검증 서비스 호출
    const validationResult = await InviteCodeValidationService.validateCode(code);

    if (!validationResult.isValid) {
      return formatErrorResponse(validationResult.errorCode!, undefined, 400);
    }

    // 검증 성공 응답
    return formatSuccessResponse(validationResult.inviteCode);
  } catch (error) {
    // Zod 검증 에러 처리
    if (error instanceof z.ZodError) {
      const errorCode = error.issues[0]?.message || INVITE_CODE_ERROR_CODES.INVALID_INPUT;
      return formatErrorResponse(errorCode, undefined, 400);
    }

    // 기타 에러 처리
    console.error('Invite code validation error:', error);
    return formatErrorResponse(INVITE_CODE_ERROR_CODES.SERVER_ERROR, undefined, 500);
  }
}
