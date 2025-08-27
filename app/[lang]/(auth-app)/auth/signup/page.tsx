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
      title={dict.auth?.signup || 'Welcome To Klosed!'}
      subtitle='Create an account'
    />
  );
}
