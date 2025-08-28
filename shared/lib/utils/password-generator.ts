/**
 * 난수 비밀번호 생성 유틸리티
 */

/**
 * 지정된 길이의 난수 비밀번호를 생성합니다.
 * 영문 대소문자, 숫자, 특수문자를 포함합니다.
 *
 * @param length - 비밀번호 길이 (기본값: 12)
 * @returns 생성된 난수 비밀번호
 */
export function generateRandomPassword(length: number = 12): string {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let password = '';

  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  return password;
}
