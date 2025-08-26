import { Header } from 'widgets/header';
import { type Locale } from 'shared/config';

interface AuthAppLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default async function AuthAppLayout({ children, params }: AuthAppLayoutProps) {
  const { lang } = await params;

  return (
    <div>
      <Header currentLang={lang} />
      {children}
    </div>
  );
}
