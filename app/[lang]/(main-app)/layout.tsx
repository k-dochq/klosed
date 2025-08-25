import { Header } from 'widgets/header';
import { type Locale } from 'shared/config';

interface MainAppLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default async function MainAppLayout({ children, params }: MainAppLayoutProps) {
  const { lang } = await params;

  return (
    <div className=''>
      <Header currentLang={lang} />
      {children}
    </div>
  );
}
