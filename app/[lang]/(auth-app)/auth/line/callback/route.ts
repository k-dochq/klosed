import { NextRequest } from 'next/server';
import { handleLineCallback } from 'features/line-auth/api';

/**
 * LINE OAuth 콜백 라우트
 * 실제 로직은 features/line-auth/api에 위임
 */
export async function GET(request: NextRequest) {
  return handleLineCallback(request);
}
