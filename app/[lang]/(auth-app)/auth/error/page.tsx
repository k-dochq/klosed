import { getDictionary } from 'app/[lang]/dictionaries';
import { AuthErrorPage } from 'features/auth-error/ui/AuthErrorPage';
import { Locale } from 'shared/config';

interface AuthErrorPageProps {
  params: {
    lang: Locale;
  };
  searchParams: {
    error?: string;
    provider?: string;
  };
}

export default async function AuthError({ params, searchParams }: AuthErrorPageProps) {
  const dict = await getDictionary(params.lang);
  
  return (
    <AuthErrorPage
      dict={dict.auth.error}
      errorCode={searchParams.error}
      provider={searchParams.provider}
    />
  );
}