import { NextRequest } from 'next/server';
import { z } from 'zod';
import {
  inviteCodeSchema,
  InviteCodeValidationService,
  formatSuccessResponse,
  formatErrorResponse,
} from 'shared/lib';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Zod를 사용한 입력 검증
    const { code } = inviteCodeSchema.parse(body);

    // 초대 코드 검증 서비스 호출
    const validationResult = await InviteCodeValidationService.validateCode(code);

    if (!validationResult.isValid) {
      return formatErrorResponse(validationResult.message, 400);
    }

    // 검증 성공 응답
    return formatSuccessResponse(validationResult.inviteCode, validationResult.message);
  } catch (error) {
    // Zod 검증 에러 처리
    if (error instanceof z.ZodError) {
      const errorMessage = error.issues[0]?.message || '입력 데이터가 유효하지 않습니다.';
      return formatErrorResponse(errorMessage, 400);
    }

    // 기타 에러 처리
    console.error('Invite code validation error:', error);
    return formatErrorResponse('서버 오류가 발생했습니다.', 500);
  }
}
