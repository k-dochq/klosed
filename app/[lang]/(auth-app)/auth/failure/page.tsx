import type { Locale } from 'shared/config';
import { getDictionary } from 'app/[lang]/dictionaries';
import { AuthFailureContainer } from 'features/auth';

interface AuthFailurePageProps {
  params: Promise<{ lang: Locale }>;
  searchParams: Promise<{ error?: string }>;
}

export default async function AuthFailurePage({ params, searchParams }: AuthFailurePageProps) {
  const { lang } = await params;
  const { error } = await searchParams;
  const dict = await getDictionary(lang);

  return <AuthFailureContainer locale={lang} errorCode={error} dict={dict} />;
}
