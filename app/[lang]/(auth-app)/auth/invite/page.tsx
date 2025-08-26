import { getDictionary } from 'app/[lang]/dictionaries';
import { InviteCodeForm } from 'features/invitation-code';
import { type Locale } from 'shared/config';

interface InvitePageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function InvitePage({ params }: InvitePageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className='flex flex-col items-center justify-center px-6 py-8'>
      <InviteCodeForm dict={dict.invite} />
    </div>
  );
}
