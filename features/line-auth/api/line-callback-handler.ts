import { NextRequest, NextResponse } from 'next/server';
import { LineAuthUseCase } from './use-cases';
import { LineApiService, UserRepository, AuthService } from './infrastructure';
import { LINE_AUTH_ERROR_CODES } from 'shared/config/error-codes';
import { redirectToErrorPage } from 'shared/lib/api';

/**
 * LINE OAuth 콜백 처리 핸들러
 */
export async function handleLineCallback(request: NextRequest): Promise<NextResponse> {
  try {
    const url = new URL(request.url);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    const error = url.searchParams.get('error');

    // 1. OAuth 에러 체크
    if (error) {
      console.error('LINE OAuth error:', error);
      return redirectToErrorPage(request.url, LINE_AUTH_ERROR_CODES.LINE_OAUTH_ERROR, 'line');
    }

    if (!code) {
      console.error('No authorization code received');
      return redirectToErrorPage(request.url, LINE_AUTH_ERROR_CODES.MISSING_AUTH_CODE, 'line');
    }

    // 2. Use Case 실행
    const lineAuthUseCase = new LineAuthUseCase(
      new LineApiService(),
      new UserRepository(),
      new AuthService(),
    );

    const result = await lineAuthUseCase.execute({
      code,
      state: state || undefined,
      requestUrl: request.url,
    });

    // 3. 결과에 따른 리다이렉트
    if (result.success) {
      console.log('LINE login successful:', {
        userId: result.userId,
        displayName: result.displayName,
      });
      return NextResponse.redirect(new URL('/', request.url));
    } else {
      console.error('LINE auth failed:', result.error);

      // 에러 타입에 따른 적절한 에러 코드 매핑
      const errorCode = mapErrorToCode(result.error);
      return redirectToErrorPage(request.url, errorCode, 'line');
    }
  } catch (error) {
    console.error('LINE callback error:', error);
    return redirectToErrorPage(request.url, LINE_AUTH_ERROR_CODES.UNKNOWN_ERROR, 'line');
  }
}

/**
 * 에러 메시지를 에러 코드로 매핑하는 함수
 */
function mapErrorToCode(errorMessage?: string): string {
  if (!errorMessage) {
    return LINE_AUTH_ERROR_CODES.UNKNOWN_ERROR;
  }

  const lowerMessage = errorMessage.toLowerCase();

  if (lowerMessage.includes('state')) {
    return LINE_AUTH_ERROR_CODES.INVALID_STATE;
  }

  if (lowerMessage.includes('expired')) {
    return LINE_AUTH_ERROR_CODES.STATE_EXPIRED;
  }

  if (lowerMessage.includes('token exchange')) {
    return LINE_AUTH_ERROR_CODES.TOKEN_EXCHANGE_FAILED;
  }

  if (lowerMessage.includes('profile')) {
    return LINE_AUTH_ERROR_CODES.PROFILE_FETCH_FAILED;
  }

  if (lowerMessage.includes('user creation')) {
    return LINE_AUTH_ERROR_CODES.USER_CREATION_FAILED;
  }

  if (lowerMessage.includes('session')) {
    return LINE_AUTH_ERROR_CODES.SESSION_CREATION_FAILED;
  }

  return LINE_AUTH_ERROR_CODES.CALLBACK_FAILED;
}
