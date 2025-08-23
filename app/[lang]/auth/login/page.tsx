import { EmailLoginForm } from 'features/email-auth';
import { PhoneLoginButton } from 'features/phone-auth';
import { AuthPageHeader, SocialLoginSection, AuthLinks } from 'features/auth';
import { AuthCard } from 'shared/ui/card';
import { Divider } from 'shared/ui/divider';
import { getDictionary } from 'app/[lang]/dictionaries';
import { type Locale } from 'shared/config';

interface LoginPageProps {
  params: Promise<{
    lang: Locale;
  }>;
}

export default async function LoginPage({ params }: LoginPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8 dark:bg-gray-900'>
      <div className='w-full max-w-md space-y-8'>
        <AuthPageHeader title={dict.auth.login.title} subtitle={dict.auth.login.subtitle} />

        <EmailLoginForm redirectTo='/auth/callback' />

        <Divider text={dict.auth.login.divider} />

        <AuthCard>
          <PhoneLoginButton
            locale={lang}
            title={dict.auth.login.phoneLogin.title}
            buttonText={dict.auth.login.phoneLogin.button}
          />
        </AuthCard>

        <Divider text={dict.auth.login.divider} />

        <AuthCard>
          <SocialLoginSection title={dict.auth.login.socialLogin.title} />
        </AuthCard>

        <AuthLinks locale={lang} links={dict.auth.login.links} />
      </div>
    </div>
  );
}
