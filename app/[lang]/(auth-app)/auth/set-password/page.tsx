import type { Locale } from 'shared/config';
import { getDictionary } from 'app/[lang]/dictionaries';
import { SetPasswordContainer } from 'features/auth';

interface SetPasswordPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function SetPasswordPage({ params }: SetPasswordPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <SetPasswordContainer
      locale={lang}
      title={dict.auth?.passwordUpdate?.title || 'Set Password'}
      subtitle={dict.auth?.passwordUpdate?.description || 'Please set your password to continue.'}
      dict={dict}
    />
  );
}
