import type { Locale } from 'shared/config';
import { getDictionary } from 'app/[lang]/dictionaries';

interface MyPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function MyPage({ params }: MyPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mx-auto max-w-4xl'>
        <h1 className='mb-8 text-3xl font-bold text-gray-900'>{dict.footer?.my || 'My Page'}</h1>

        <div className='rounded-lg bg-white p-6 shadow-md'>
          <p className='text-gray-600'>This is the My page. Content will be implemented here.</p>
        </div>
      </div>
    </div>
  );
}
