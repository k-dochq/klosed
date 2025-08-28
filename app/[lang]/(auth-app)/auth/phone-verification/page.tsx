import { getDictionary } from 'app/[lang]/dictionaries';
import { PhoneVerificationForm } from 'features/phone-verification/ui/PhoneVerificationForm';
import { Locale } from 'shared/config';

interface PhoneVerificationPageProps {
  params: Promise<{
    lang: Locale;
  }>;
  searchParams: Promise<{
    userId?: string;
    email?: string;
  }>;
}

export default async function PhoneVerificationPage({
  params,
  searchParams,
}: PhoneVerificationPageProps) {
  const { lang } = await params;
  const resolvedSearchParams = await searchParams;
  const dict = await getDictionary(lang);

  return (
    <div className='flex flex-col items-center justify-center px-6 py-8'>
      <PhoneVerificationForm
        dict={dict.auth.phoneVerification}
        userId={resolvedSearchParams.userId}
        email={resolvedSearchParams.email}
      />
    </div>
  );
}
