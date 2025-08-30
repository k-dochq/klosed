import { NextRequest, NextResponse } from 'next/server';
import { UserRepository } from 'features/line-auth/api-server';
import { routeErrorLogger } from 'shared/lib';

/**
 * 이메일 주소 존재 여부 체크 API 핸들러
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  const endpoint = '/api/email/check-email';
  const method = 'POST';

  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ success: false, error: 'Email is required' }, { status: 400 });
    }

    // Prisma를 사용한 사용자 존재 여부 확인
    const userRepository = new UserRepository();
    const userExists = await userRepository.existsByEmail(email);

    return NextResponse.json({
      success: true,
      exists: userExists,
    });
  } catch (error) {
    const requestId = routeErrorLogger.logError({
      error: error as Error,
      endpoint,
      method,
      request,
    });

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        requestId,
      },
      { status: 500 },
    );
  }
}
