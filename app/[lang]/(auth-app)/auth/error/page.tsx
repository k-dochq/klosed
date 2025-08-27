import { getDictionary } from 'app/[lang]/dictionaries';
import { AuthErrorPage } from 'features/auth-error/ui/AuthErrorPage';
import { Locale } from 'shared/config';

interface AuthErrorPageProps {
  params: Promise<{
    lang: Locale;
  }>;
  searchParams: Promise<{
    error?: string;
    provider?: string;
  }>;
}

export default async function AuthError({ params, searchParams }: AuthErrorPageProps) {
  const { lang } = await params;
  const resolvedSearchParams = await searchParams;
  const dict = await getDictionary(lang);

  return (
    <AuthErrorPage
      dict={dict.auth.error}
      errorCode={resolvedSearchParams.error}
      provider={resolvedSearchParams.provider}
    />
  );
}
