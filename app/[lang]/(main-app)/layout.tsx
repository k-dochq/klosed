import { Header } from 'widgets/header';
import { BottomNavigation } from 'widgets/bottom-navigation';
import { type Locale } from 'shared/config';

interface MainAppLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default async function MainAppLayout({ children, params }: MainAppLayoutProps) {
  const { lang } = await params;

  return (
    <div className='pb-20'>
      <Header currentLang={lang} />
      {children}
      <BottomNavigation currentLang={lang} />
    </div>
  );
}
