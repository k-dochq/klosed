/**
 * 이메일 유효성 검증 유틸리티
 */

/**
 * 이메일 주소 형식을 검증합니다.
 *
 * @param email 검증할 이메일 주소
 * @returns 유효하면 true, 그렇지 않으면 false
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * 이메일 주소의 도메인을 검증합니다.
 *
 * @param email 검증할 이메일 주소
 * @param allowedDomains 허용할 도메인 목록 (옵션)
 * @returns 유효하면 true, 그렇지 않으면 false
 */
export function isValidEmailDomain(email: string, allowedDomains?: string[]): boolean {
  if (!isValidEmail(email)) {
    return false;
  }

  if (!allowedDomains || allowedDomains.length === 0) {
    return true;
  }

  const domain = email.split('@')[1]?.toLowerCase();
  return allowedDomains.some((allowedDomain) => allowedDomain.toLowerCase() === domain);
}

/**
 * 이메일 주소에서 도메인을 추출합니다.
 *
 * @param email 이메일 주소
 * @returns 도메인 또는 null
 */
export function extractEmailDomain(email: string): string | null {
  if (!isValidEmail(email)) {
    return null;
  }

  return email.split('@')[1]?.toLowerCase() || null;
}
