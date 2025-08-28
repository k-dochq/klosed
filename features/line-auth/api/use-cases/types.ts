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
  email?: string;
  session?: import('@supabase/supabase-js').Session;
  isNewUser?: boolean; // 새 사용자인지 여부
  error?: string;
}
