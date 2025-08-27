import type { Locale } from 'shared/config';
import { getDictionary } from 'app/[lang]/dictionaries';
import { SignupContainer } from 'features/signup';

interface SignupPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function SignupPage({ params }: SignupPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <SignupContainer
      locale={lang}
      title={dict.auth.signup.title}
      subtitle={dict.auth.signup.subtitle}
      dict={dict.auth.signup}
    />
  );
}
