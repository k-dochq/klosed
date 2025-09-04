import { createSupabaseServerClient } from 'shared/lib/supabase/server-client';
import { redirect } from 'next/navigation';
import { type Locale } from 'shared/config/locales';

interface PageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function RootPage({ params }: PageProps) {
  const { lang } = await params;
  const supabase = await createSupabaseServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    // 로그인된 사용자는 메인 페이지로 이동
    redirect(`/${lang}/main`);
  } else {
    // 로그인되지 않은 사용자는 온보딩으로 이동
    redirect(`/${lang}/auth/onboarding`);
  }
}
