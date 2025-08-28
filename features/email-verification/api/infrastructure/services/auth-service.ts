import { randomBytes } from 'crypto';
import { headers } from 'next/headers';
import { IAuthService } from '../../entities/types';

/**
 * 인증 서비스 구현체 - 토큰 생성 및 검증 담당
 */
export class AuthService implements IAuthService {
  private readonly tokenLength = 32; // 32바이트 = 64자리 hex 문자열
  private readonly tokenExpiryHours = 24; // 24시간 유효

  async generateVerificationToken(email: string): Promise<string> {
    // 이메일을 기반으로 토큰 생성 (실제로는 더 복잡한 로직 사용 권장)
    const timestamp = Date.now().toString();
    const randomPart = randomBytes(this.tokenLength).toString('hex');
    const emailHash = Buffer.from(email).toString('base64').substring(0, 10);

    return `${randomPart}_${emailHash}_${timestamp}`;
  }

  async storeVerificationToken(token: string, email: string, expiresAt: Date): Promise<void> {
    // TODO: 실제로는 Redis, Database, 또는 JWT를 사용하여 토큰 저장
    // 현재는 메모리에 저장하는 임시 구현
    console.log('Storing verification token:', {
      token: token.substring(0, 10) + '...', // 보안을 위해 일부만 로그
      email,
      expiresAt,
    });

    // 실제 구현 시에는 데이터베이스나 Redis에 저장
    // 예: await redis.setex(`verification:${token}`, expirySeconds, email);
  }

  verifyTokenFormat(token: string): boolean {
    // 토큰 형식 검증: {randomPart}_{emailHash}_{timestamp}
    const parts = token.split('_');
    return (
      parts.length === 3 &&
      parts[0].length === this.tokenLength * 2 && // hex 문자열 길이
      parts[1].length === 10 &&
      !isNaN(Number(parts[2]))
    ); // timestamp가 숫자인지 확인
  }

  getTokenExpiryDate(): Date {
    const now = new Date();
    now.setHours(now.getHours() + this.tokenExpiryHours);
    return now;
  }

  isTokenExpired(expiresAt: Date): boolean {
    return new Date() > expiresAt;
  }

  async generateVerificationLink(token: string): Promise<string> {
    try {
      // Next.js headers를 사용하여 현재 요청의 호스트 정보 가져오기
      const headersList = await headers();
      const host = headersList.get('host');
      const protocol = headersList.get('x-forwarded-proto') || 'http';

      // 호스트 정보가 없으면 기본값 사용
      const baseUrl = host ? `${protocol}://${host}` : 'http://localhost:3000';

      return `${baseUrl}/auth/reset-password?token=${token}`;
    } catch (error) {
      // 서버 사이드가 아닌 곳에서 호출되거나 headers를 사용할 수 없는 경우
      // 환경변수나 기본값으로 폴백
      console.warn('Failed to get headers, using fallback URL:', error);
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
      return `${baseUrl}/auth/reset-password?token=${token}`;
    }
  }
}
