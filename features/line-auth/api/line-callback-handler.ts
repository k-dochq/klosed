import { NextRequest, NextResponse } from 'next/server';
import { LineAuthUseCase } from './use-cases';
import { LineApiService } from './infrastructure';

/**
 * LINE OAuth 콜백 처리 핸들러
 */
export async function handleLineCallback(request: NextRequest): Promise<NextResponse> {
  try {
    const url = new URL(request.url);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    const error = url.searchParams.get('error');

    // 1. 에러 체크
    if (error) {
      console.error('LINE OAuth error:', error);
      return NextResponse.redirect(new URL(`/auth/login?error=line_auth_failed`, request.url));
    }

    if (!code) {
      console.error('No authorization code received');
      return NextResponse.redirect(new URL(`/auth/login?error=missing_code`, request.url));
    }

    // 2. Use Case 실행
    const lineApiService = new LineApiService();
    const lineAuthUseCase = new LineAuthUseCase(lineApiService);

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
      return NextResponse.redirect(new URL(`/auth/login?error=callback_failed`, request.url));
    }
  } catch (error) {
    console.error('LINE callback error:', error);
    return NextResponse.redirect(new URL(`/auth/login?error=callback_failed`, request.url));
  }
}