import jwt from 'jsonwebtoken';

/**
 * JWT 토큰 파싱 유틸리티
 */

export interface JWTPayload {
  iss?: string;
  sub?: string;
  aud?: string;
  exp?: number;
  iat?: number;
  email?: string;
  [key: string]: any;
}

/**
 * JWT 토큰을 파싱하여 페이로드를 반환
 * 서명 검증은 하지 않고 페이로드만 추출
 */
export function parseJWT(token: string): JWTPayload {
  try {
    const decoded = jwt.decode(token);

    if (!decoded || typeof decoded === 'string') {
      throw new Error('Invalid JWT payload');
    }

    return decoded as JWTPayload;
  } catch (error) {
    throw new Error(
      `Failed to parse JWT: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
}

/**
 * JWT 토큰에서 이메일을 추출
 */
export function extractEmailFromJWT(token: string): string {
  const payload = parseJWT(token);

  if (!payload.email) {
    throw new Error('Email not found in JWT payload');
  }

  return payload.email;
}
