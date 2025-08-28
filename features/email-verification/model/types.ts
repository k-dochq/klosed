/**
 * 이메일 인증 관련 타입 정의
 */

export interface EmailVerificationToken {
  id: string;
  email: string;
  token: string;
  expiresAt: Date;
  usedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface SendVerificationEmailRequest {
  email: string;
}

export interface SendVerificationEmailResponse {
  success: boolean;
  error?: string;
  data?: {
    messageId: string;
  };
}

export interface VerifyEmailTokenRequest {
  token: string;
}

export interface VerifyEmailTokenResponse {
  success: boolean;
  error?: string;
  data?: {
    email: string;
    isExpired: boolean;
    isUsed: boolean;
  };
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  error?: string;
}
