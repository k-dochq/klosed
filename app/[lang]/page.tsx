import { getDictionary } from './dictionaries';
import { type Locale } from 'shared/config';

export default async function Page({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const _dict = await getDictionary(lang);

  return <div>test</div>;
}
