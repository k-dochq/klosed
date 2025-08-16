import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { LINE_CONFIG, getLineCallbackUrl } from 'shared/config';
import type { LineAuthRequest, LineTokenResponse, LineProfile } from 'shared/model/types';

/**
 * LINE OAuth 콜백 처리
 * Presentation Layer (Controller)
 */
export async function GET(request: NextRequest) {
  try {
    // 1. 입력 검증
    const url = new URL(request.url);
    const authRequest: LineAuthRequest = {
      code: url.searchParams.get('code') || '',
      state: url.searchParams.get('state') || undefined,
      error: url.searchParams.get('error') || undefined,
      error_description: url.searchParams.get('error_description') || undefined,
    };

    // 2. 에러 체크
    if (authRequest.error) {
      console.error('LINE OAuth error:', authRequest.error, authRequest.error_description);
      return NextResponse.redirect(new URL(`/auth/login?error=line_auth_failed`, request.url));
    }

    if (!authRequest.code) {
      console.error('No authorization code received');
      return NextResponse.redirect(new URL(`/auth/login?error=missing_code`, request.url));
    }

    // 3. Base URL 동적 생성
    const headersList = await headers();
    const host = headersList.get('host') || 'localhost:3000';
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const baseUrl = `${protocol}://${host}`;
    const callbackUrl = getLineCallbackUrl(baseUrl);

    // 4. Use Case 실행 - Access Token 교환
    const tokenResult = await exchangeCodeForToken(authRequest.code, callbackUrl);
    if (!tokenResult.success || !tokenResult.data) {
      console.error('Token exchange failed:', tokenResult.error);
      return NextResponse.redirect(new URL(`/auth/login?error=token_exchange_failed`, request.url));
    }

    // 5. Use Case 실행 - 사용자 프로필 조회
    const profileResult = await fetchLineProfile(tokenResult.data.access_token);
    if (!profileResult.success || !profileResult.data) {
      console.error('Profile fetch failed:', profileResult.error);
      return NextResponse.redirect(new URL(`/auth/login?error=profile_fetch_failed`, request.url));
    }

    // 6. 성공 처리 (나중에 Supabase 연동 추가 예정)
    console.log('LINE login successful:', {
      userId: profileResult.data.userId,
      displayName: profileResult.data.displayName,
    });

    // 7. 로그인 성공 후 리다이렉트
    return NextResponse.redirect(new URL('/', request.url));
  } catch (error) {
    console.error('LINE callback error:', error);
    return NextResponse.redirect(new URL(`/auth/login?error=internal_error`, request.url));
  }
}

/**
 * Authorization Code를 Access Token으로 교환
 * Application Layer (Use Case)
 */
async function exchangeCodeForToken(
  code: string,
  callbackUrl: string,
): Promise<{ success: boolean; data?: LineTokenResponse; error?: string }> {
  try {
    const response = await fetch(LINE_CONFIG.TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: callbackUrl,
        client_id: LINE_CONFIG.CHANNEL_ID,
        client_secret: LINE_CONFIG.CHANNEL_SECRET,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        success: false,
        error: `Token exchange failed: ${response.status} ${errorText}`,
      };
    }

    const tokenData: LineTokenResponse = await response.json();
    return { success: true, data: tokenData };
  } catch (error) {
    return {
      success: false,
      error: `Token exchange error: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

/**
 * Access Token으로 사용자 프로필 조회
 * Application Layer (Use Case)
 */
async function fetchLineProfile(
  accessToken: string,
): Promise<{ success: boolean; data?: LineProfile; error?: string }> {
  try {
    const response = await fetch(LINE_CONFIG.PROFILE_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        success: false,
        error: `Profile fetch failed: ${response.status} ${errorText}`,
      };
    }

    const profileData: LineProfile = await response.json();
    return { success: true, data: profileData };
  } catch (error) {
    return {
      success: false,
      error: `Profile fetch error: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}
