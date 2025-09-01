import type { Locale } from 'shared/config';
import { getDictionary } from 'app/[lang]/dictionaries';
import { LogoutButton } from 'features/auth';
import { createServerClient } from 'shared/lib/supabase/server-only';
import { redirect } from 'next/navigation';

interface MyPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function MyPage({ params }: MyPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  // Supabase 서버 클라이언트 생성
  const supabase = await createServerClient();

  // 현재 사용자 정보 가져오기
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  // 인증되지 않은 사용자는 로그인 페이지로 리다이렉트
  if (error || !user) {
    redirect(`/${lang}/auth/invite`);
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mx-auto max-w-4xl'>
        <h1 className='mb-8 text-3xl font-bold text-gray-900'>{dict.footer?.my || 'My Page'}</h1>

        <div className='rounded-lg bg-white p-6 shadow-md'>
          {/* 사용자 정보 섹션 */}
          <div className='mb-8'>
            <h2 className='mb-4 text-xl font-semibold text-gray-900'>사용자 정보</h2>
            <div className='space-y-3'>
              <div className='flex items-center justify-between border-b border-gray-200 pb-2'>
                <span className='font-medium text-gray-600'>이메일:</span>
                <span className='text-gray-900'>{user.email}</span>
              </div>

              {user.phone && (
                <div className='flex items-center justify-between border-b border-gray-200 pb-2'>
                  <span className='font-medium text-gray-600'>전화번호:</span>
                  <span className='text-gray-900'>{user.phone}</span>
                </div>
              )}

              <div className='flex items-center justify-between border-b border-gray-200 pb-2'>
                <span className='font-medium text-gray-600'>가입일:</span>
                <span className='text-gray-900'>
                  {new Date(user.created_at).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>

              <div className='flex items-center justify-between border-b border-gray-200 pb-2'>
                <span className='font-medium text-gray-600'>마지막 로그인:</span>
                <span className='text-gray-900'>
                  {new Date(user.last_sign_in_at || user.created_at).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>

              <div className='flex items-center justify-between border-b border-gray-200 pb-2'>
                <span className='font-medium text-gray-600'>계정 상태:</span>
                <span
                  className={`rounded-full px-2 py-1 text-xs font-medium ${
                    user.email_confirmed_at
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {user.email_confirmed_at ? '이메일 인증 완료' : '이메일 인증 필요'}
                </span>
              </div>
            </div>
          </div>

          {/* 계정 관리 섹션 */}
          <div className='mb-8'>
            <h2 className='mb-4 text-xl font-semibold text-gray-900'>계정 관리</h2>
            <div className='space-y-3'>
              <div className='flex items-center justify-between border-b border-gray-200 pb-2'>
                <span className='font-medium text-gray-600'>로그인 제공자:</span>
                <span className='text-gray-900'>{user.app_metadata?.provider || '이메일'}</span>
              </div>

              <div className='flex items-center justify-between border-b border-gray-200 pb-2'>
                <span className='font-medium text-gray-600'>사용자 ID:</span>
                <span className='font-mono text-xs text-gray-500'>{user.id}</span>
              </div>
            </div>
          </div>

          {/* 로그아웃 버튼 */}
          <div className='border-t pt-6'>
            <LogoutButton dict={dict.auth || {}} locale={lang} />
          </div>
        </div>
      </div>
    </div>
  );
}
