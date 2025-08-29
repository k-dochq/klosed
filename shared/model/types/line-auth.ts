/**
 * LINE OAuth2 관련 타입 정의
 */

export interface LineTokenResponse {
  access_token: string;
  expires_in: number;
  id_token: string;
  refresh_token: string;
  scope: string;
  token_type: 'Bearer';
}

export interface LineProfile {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  statusMessage?: string;
  email?: string;
}

export interface LineAuthState {
  redirectTo?: string;
  timestamp: number;
}

export interface LineAuthRequest {
  code: string;
  state?: string;
  error?: string;
  error_description?: string;
}

/**
 * LINE 로그인 결과
 */
export interface LineAuthResult {
  success: boolean;
  profile?: LineProfile;
  error?: string;
}
