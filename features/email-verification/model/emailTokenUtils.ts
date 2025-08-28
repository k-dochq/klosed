import { randomBytes } from 'crypto';
import { headers } from 'next/headers';

/**
 * 이메일 토큰 생성 및 검증 유틸리티
 */

const TOKEN_LENGTH = 32; // 32바이트 = 64자리 hex 문자열
const TOKEN_EXPIRY_HOURS = 24; // 24시간 유효

/**
 * 랜덤 토큰 생성
 */
export function generateToken(): string {
  return randomBytes(TOKEN_LENGTH).toString('hex');
}

/**
 * 토큰 만료 시간 계산
 */
export function getTokenExpiryDate(): Date {
  const now = new Date();
  now.setHours(now.getHours() + TOKEN_EXPIRY_HOURS);
  return now;
}

/**
 * 토큰이 만료되었는지 확인
 */
export function isTokenExpired(expiresAt: Date): boolean {
  return new Date() > expiresAt;
}

/**
 * 토큰 형식 검증 (64자리 hex 문자열)
 */
export function isValidTokenFormat(token: string): boolean {
  const hexRegex = /^[a-f0-9]{64}$/;
  return hexRegex.test(token);
}

/**
 * 이메일 인증 링크 생성
 */
export async function generateVerificationLink(token: string): Promise<string> {
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

/**
 * 토큰에서 사용자 정보 추출 (실제로는 DB에서 조회)
 * 여기서는 간단한 예시로 구현
 */
export interface TokenPayload {
  email: string;
  createdAt: Date;
  expiresAt: Date;
}

/**
 * 토큰 페이로드 인코딩 (실제로는 JWT나 다른 보안 방식 사용 권장)
 */
export function encodeTokenPayload(payload: TokenPayload): string {
  return Buffer.from(JSON.stringify(payload)).toString('base64');
}

/**
 * 토큰 페이로드 디코딩
 */
export function decodeTokenPayload(encodedPayload: string): TokenPayload | null {
  try {
    const decoded = Buffer.from(encodedPayload, 'base64').toString();
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}
