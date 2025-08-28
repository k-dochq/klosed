import { NextRequest, NextResponse } from 'next/server';
import { SendVerificationEmailUseCase } from './use-cases/send-verification-email';
import { EmailApiService } from './infrastructure/services/email-api-service';
import { UserRepository } from './infrastructure/repositories/user-repository';
import { AuthService } from './infrastructure/services/auth-service';
import { validateSendVerificationEmail } from './entities/schemas';
import { EMAIL_VERIFICATION_ERROR_CODES } from './entities/types';

/**
 * 이메일 인증 메일 발송 API 핸들러
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // 1. 요청 본문 파싱 및 검증
    const body = await request.json();
    const validation = validateSendVerificationEmail(body);

    if (!validation.success) {
      console.error('Validation failed:', validation.error);
      return NextResponse.json(
        {
          success: false,
          error: EMAIL_VERIFICATION_ERROR_CODES.INVALID_EMAIL_FORMAT,
        },
        { status: 400 },
      );
    }

    // 2. Use Case 생성 및 실행
    const useCase = new SendVerificationEmailUseCase(new EmailApiService());

    const result = await useCase.execute({
      email: validation.data.email,
      requestUrl: request.url,
    });

    // 3. 결과에 따른 응답
    if (result.success) {
      console.log('Email verification request successful:', {
        email: validation.data.email,
        messageId: result.data?.messageId,
      });

      return NextResponse.json({
        success: true,
        message: 'Verification email sent successfully',
        data: {
          messageId: result.data?.messageId,
          expiresAt: result.data?.expiresAt,
        },
      });
    } else {
      console.error('Email verification request failed:', result.error);

      // 에러 타입에 따른 적절한 HTTP 상태 코드 매핑
      const statusCode = mapErrorToStatusCode(result.error);

      return NextResponse.json({ success: false, error: result.error }, { status: statusCode });
    }
  } catch (error) {
    console.error('Email verification API error:', error);
    return NextResponse.json(
      { success: false, error: EMAIL_VERIFICATION_ERROR_CODES.UNKNOWN_ERROR },
      { status: 500 },
    );
  }
}

/**
 * 에러 메시지를 HTTP 상태 코드로 매핑하는 함수
 */
function mapErrorToStatusCode(errorCode?: string): number {
  if (!errorCode) {
    return 500;
  }

  const errorStatusMap: Record<string, number> = {
    [EMAIL_VERIFICATION_ERROR_CODES.INVALID_EMAIL_FORMAT]: 400,
    [EMAIL_VERIFICATION_ERROR_CODES.EMAIL_ALREADY_VERIFIED]: 409,
    [EMAIL_VERIFICATION_ERROR_CODES.USER_NOT_FOUND]: 404,
    [EMAIL_VERIFICATION_ERROR_CODES.TOKEN_GENERATION_FAILED]: 500,
    [EMAIL_VERIFICATION_ERROR_CODES.EMAIL_SEND_FAILED]: 502,
    [EMAIL_VERIFICATION_ERROR_CODES.UNKNOWN_ERROR]: 500,
  };

  return errorStatusMap[errorCode] || 500;
}
