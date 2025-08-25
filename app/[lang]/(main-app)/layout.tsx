import { Header } from 'widgets/header';
import { Footer } from 'widgets/footer';
import { type Locale } from 'shared/config';

interface MainAppLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default async function MainAppLayout({ children, params }: MainAppLayoutProps) {
  const { lang } = await params;

  return (
    <div className='pb-16'>
      <Header currentLang={lang} />
      {children}
      <Footer />
    </div>
  );
}
