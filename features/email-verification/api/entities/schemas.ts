import { z } from 'zod';

/**
 * Email Verification 입력 검증 스키마
 */

// 이메일 주소 검증 스키마
export const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .email('Please enter a valid email address')
  .max(254, 'Email address is too long'); // RFC 5321 제한

// Send Verification Email 요청 스키마
export const sendVerificationEmailSchema = z.object({
  email: emailSchema,
});

// 타입 추론
export type SendVerificationEmailInput = z.infer<typeof sendVerificationEmailSchema>;

// 검증 함수들
export function validateSendVerificationEmail(data: unknown) {
  return sendVerificationEmailSchema.safeParse(data);
}

export function validateEmail(email: string) {
  return emailSchema.safeParse(email);
}
