/**
 * LINE 인증 관련 도메인 모델
 */

export interface LineTokenResponse {
  access_token: string;
  expires_in: number;
  id_token: string;
  refresh_token: string;
  scope: string;
  token_type: string;
}

export interface LineAuthState {
  timestamp: number;
  nonce: string;
}

/**
 * LINE 인증 관련 도메인 에러
 */
export class LineAuthError extends Error {
  constructor(
    message: string,
    public readonly code: string,
  ) {
    super(message);
    this.name = 'LineAuthError';
  }
}

export class LineTokenExchangeError extends LineAuthError {
  constructor(message: string) {
    super(message, 'TOKEN_EXCHANGE_FAILED');
  }
}

export class LineProfileFetchError extends LineAuthError {
  constructor(message: string) {
    super(message, 'PROFILE_FETCH_FAILED');
  }
}

export class LineStateValidationError extends LineAuthError {
  constructor(message: string) {
    super(message, 'INVALID_STATE');
  }
}

export class LineUserCreationError extends LineAuthError {
  constructor(message: string) {
    super(message, 'USER_CREATION_FAILED');
  }
}

export class LineSessionError extends LineAuthError {
  constructor(message: string) {
    super(message, 'SESSION_FAILED');
  }
}

export class LineEmailNotFoundError extends LineAuthError {
  constructor(message: string) {
    super(message, 'EMAIL_NOT_FOUND');
  }
}

export class LineProfile {
  constructor(
    public readonly userId: string,
    public readonly email: string,
  ) {
    // 이메일 필수 검증
    if (!email || email.trim() === '') {
      throw new LineEmailNotFoundError(
        'Email is required in LINE profile. Please ensure email permission is granted.',
      );
    }
  }

  // JWT 페이로드로부터 LineProfile 생성
  static fromJWTPayload(payload: any): LineProfile {
    if (!payload.sub) {
      throw new LineEmailNotFoundError('User ID not found in JWT payload');
    }

    if (!payload.email) {
      throw new LineEmailNotFoundError('Email not found in JWT payload');
    }

    return new LineProfile(payload.sub, payload.email);
  }
}
