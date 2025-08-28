import { getDictionary } from 'app/[lang]/dictionaries';
import { AuthErrorPage } from 'features/auth-error/ui/AuthErrorPage';
import { Locale } from 'shared/config';

interface AuthFailurePageProps {
  params: Promise<{
    lang: Locale;
  }>;
  searchParams: Promise<{
    code?: string;
    provider?: string;
    message?: string;
  }>;
}

export default async function AuthFailure({ params, searchParams }: AuthFailurePageProps) {
  const { lang } = await params;
  const resolvedSearchParams = await searchParams;
  const dict = await getDictionary(lang);

  return (
    <AuthErrorPage
      dict={dict.auth.error}
      errorCode={resolvedSearchParams.code}
      provider={resolvedSearchParams.provider}
      message={resolvedSearchParams.message}
    />
  );
}
