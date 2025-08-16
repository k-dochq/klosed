export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ko' }, { lang: 'th' }];
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
