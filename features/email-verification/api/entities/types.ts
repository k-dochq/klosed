/**
 * Email Verification 도메인 엔티티 타입 정의
 */

// API 요청/응답 타입
export interface SendVerificationEmailRequest {
  email: string;
}

export interface SendVerificationEmailResponse {
  success: boolean;
  data?: {
    messageId: string;
    expiresAt: Date;
  };
  error?: string;
}

// Use Case 요청/응답 타입
export interface SendVerificationEmailUseCaseRequest {
  email: string;
  requestUrl?: string;
}

export interface SendVerificationEmailUseCaseResponse {
  success: boolean;
  data?: {
    messageId: string;
    expiresAt: Date;
    verificationLink: string;
  };
  error?: string;
}

// Infrastructure 인터페이스
export interface IEmailApiService {
  sendVerificationEmail(
    email: string,
    subject: string,
    htmlContent: string,
  ): Promise<{ success: boolean; messageId?: string; error?: string }>;
}

export interface IUserRepository {
  findByEmail(email: string): Promise<{ id: string; email: string } | null>;
  createUser(email: string): Promise<{ id: string; email: string }>;
  updateUserVerificationStatus(userId: string, isVerified: boolean): Promise<void>;
}

export interface IAuthService {
  generateVerificationToken(email: string): Promise<string>;
  storeVerificationToken(token: string, email: string, expiresAt: Date): Promise<void>;
  verifyTokenFormat(token: string): boolean;
  getTokenExpiryDate(): Date;
  isTokenExpired(expiresAt: Date): boolean;
  generateVerificationLink(token: string): Promise<string>;
}

// 에러 코드 정의
export const EMAIL_VERIFICATION_ERROR_CODES = {
  INVALID_EMAIL_FORMAT: 'INVALID_EMAIL_FORMAT',
  EMAIL_ALREADY_VERIFIED: 'EMAIL_ALREADY_VERIFIED',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  TOKEN_GENERATION_FAILED: 'TOKEN_GENERATION_FAILED',
  EMAIL_SEND_FAILED: 'EMAIL_SEND_FAILED',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
} as const;

export type EmailVerificationErrorCode =
  (typeof EMAIL_VERIFICATION_ERROR_CODES)[keyof typeof EMAIL_VERIFICATION_ERROR_CODES];
