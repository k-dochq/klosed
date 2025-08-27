import { LineAuthUseCase } from 'features/line-auth/api/use-cases';
import { LineApiService, UserRepository, AuthService } from 'features/line-auth/api/infrastructure';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { getDictionary } from 'app/[lang]/dictionaries';
import { type Locale } from 'shared/config';
import { LineLoginHandler } from './line-login-handler';

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
  try {
    // Next.js 15: params와 searchParams는 Promise 타입이므로 await 사용
    const { lang } = await params;
    const resolvedSearchParams = await searchParams;

    // 다국어 사전 가져오기
    const dictionary = await getDictionary(lang);

    // OAuth 에러 체크
    if (resolvedSearchParams.error) {
      console.error('LINE OAuth error:', resolvedSearchParams.error);
      redirect('/auth/error?error=LINE_OAUTH_ERROR');
    }

    if (!resolvedSearchParams.code) {
      console.error('No authorization code received');
      redirect('/auth/error?error=MISSING_AUTH_CODE');
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

    // 성공 시 클라이언트 컴포넌트에서 로그인 처리
    if (result.success && result.email) {
      console.log('LINE auth successful:', {
        userId: result.userId,
        displayName: result.displayName,
        email: result.email,
      });
      return <LineLoginHandler email={result.email} dictionary={dictionary} />;
    } else {
      console.error('LINE auth failed:', result.error);
      redirect('/auth/error?error=LINE_AUTH_FAILED');
    }
  } catch (error) {
    console.error('LINE callback page error:', error);
    redirect('/auth/error?error=LINE_CALLBACK_ERROR');
  }
}
