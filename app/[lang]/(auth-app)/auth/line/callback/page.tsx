import { LineAuthUseCase } from 'features/line-auth/api/use-cases';
import { LineApiService, UserRepository, AuthService } from 'features/line-auth/api/infrastructure';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { getDictionary } from 'app/[lang]/dictionaries';
import { type Locale } from 'shared/config';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { PASSWORDLESS_AUTH_PASSWORD } from 'shared/config/auth';

/**
 * LINE OAuth 콜백 페이지
 * 서버 컴포넌트에서 직접 LINE 인증 처리 (Next.js 15 searchParams 규칙 준수)
 */
interface LineCallbackPageProps {
  params: Promise<{
    lang: Locale;
  }>;
  searchParams: Promise<{
    code?: string;
    state?: string;
    error?: string;
  }>;
}

export default async function LineCallbackPage({ params, searchParams }: LineCallbackPageProps) {
  const { lang } = await params;

  try {
    const resolvedSearchParams = await searchParams;

    // OAuth 에러 체크
    if (resolvedSearchParams.error) {
      console.error('LINE OAuth error:', resolvedSearchParams.error);
      redirect(`/${lang}/auth/failure?code=LINE_OAUTH_ERROR&provider=line`);
    }

    if (!resolvedSearchParams.code) {
      console.error('No authorization code received');
      redirect(`/${lang}/auth/failure?code=MISSING_AUTH_CODE&provider=line`);
    }

    // 동적으로 현재 요청 URL 생성
    const headersList = await headers();
    const host = headersList.get('host');
    const protocol =
      headersList.get('x-forwarded-proto') || (host?.includes('localhost') ? 'http' : 'https');
    const currentUrl = `${protocol}://${host}`;

    // LINE 인증 Use Case 실행
    const lineApiService = new LineApiService();
    const userRepository = new UserRepository();
    const authService = new AuthService();
    const lineAuthUseCase = new LineAuthUseCase(lineApiService, userRepository, authService);

    const result = await lineAuthUseCase.execute({
      code: resolvedSearchParams.code,
      state: resolvedSearchParams.state,
      requestUrl: currentUrl,
    });

    // 성공 시 서버에서 직접 Supabase 인증 처리
    if (result.success && result.email) {
      // Supabase 서버 클라이언트 생성
      const cookieStore = await cookies();
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            getAll() {
              return cookieStore.getAll();
            },
            setAll(cookiesToSet) {
              try {
                cookiesToSet.forEach(({ name, value, options }) =>
                  cookieStore.set(name, value, options),
                );
              } catch {
                // 서버 컴포넌트에서 호출된 경우 무시
              }
            },
          },
        },
      );

      // LINE 계정으로 이메일 로그인 (passwordless)
      const { data, error } = await supabase.auth.signInWithPassword({
        email: result.email.trim(),
        password: PASSWORDLESS_AUTH_PASSWORD,
      });

      if (error) {
        console.error('LINE login error:', error);
        redirect(
          `/${lang}/auth/failure?code=LINE_LOGIN_FAILED&provider=line&message=${encodeURIComponent(error.message)}`,
        );
      }

      // 로그인 성공 시 리다이렉트
      if (result.isNewUser) {
        // 새 사용자: 핸드폰 인증 페이지로 이동
        redirect(`/${lang}/auth/phone-verification?email=${encodeURIComponent(result.email)}`);
      } else {
        // 기존 사용자: 홈으로 이동
        redirect(`/${lang}`);
      }
    } else {
      console.error('LINE auth failed:', result.error);
      redirect(`/${lang}/auth/failure?code=LINE_AUTH_FAILED&provider=line`);
    }
  } catch (error) {
    console.error('LINE callback page error:', error);
    redirect(`/${lang}/auth/failure?code=LINE_CALLBACK_ERROR&provider=line`);
  }
}
