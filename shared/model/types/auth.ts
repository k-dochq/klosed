/**
 * 인증 관련 타입 정의
 */

// Supabase Session 타입 간소화 버전
export interface Session {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  user: User;
}

// Supabase User 타입 간소화 버전
export interface User {
  id: string;
  email?: string;
  phone?: string;
  created_at: string;
  updated_at: string;
  aud: string;
  role?: string;
  app_metadata: Record<string, any>;
  user_metadata: Record<string, any>;
}

// 사용자 메타데이터 타입
export interface UserMetadata {
  provider?: string;
  lineId?: string;
  nickname?: string;
  pictureUrl?: string;
  [key: string]: any;
}

// 앱 메타데이터 타입
export interface AppMetadata {
  provider?: string;
  providers?: string[];
  [key: string]: any;
}
