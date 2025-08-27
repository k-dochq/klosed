import type { Dictionary } from 'shared/model/types';
import type { Locale } from 'shared/config';
import { getDictionary } from 'app/[lang]/dictionaries';

interface SignupPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function SignupPage({ params }: SignupPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <div className='flex'></div>;
}
