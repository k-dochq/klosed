/**
 * LINE 인증 Use Case 요청 인터페이스
 */
export interface LineAuthRequest {
  code: string;
  state?: string;
  requestUrl: string;
}

/**
 * LINE 인증 Use Case 결과 인터페이스
 */
export interface LineAuthResult {
  success: boolean;
  userId?: string;
  displayName?: string;
  error?: string;
}
