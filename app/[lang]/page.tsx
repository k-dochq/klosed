import { getDictionary } from './dictionaries';
import { UserProfileWidget } from 'widgets/user-profile';
import { LanguageSwitcher } from 'shared/ui/language-switcher';
import { type Locale } from 'shared/config';
import Link from 'next/link';

export default async function Page({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className='min-h-screen bg-gradient-to-b from-neutral-50 to-white text-neutral-900 dark:from-neutral-900 dark:to-neutral-950 dark:text-neutral-100'>
      <div className='mx-auto w-full max-w-5xl space-y-12 px-6 py-10 sm:py-14'>
        <header className='space-y-3'>
          <div className='flex items-center justify-between'>
            <div className='space-y-3'>
              <div className='inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs text-black/60 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-white/70'>
                <span>Hi‑So Concierge</span>
                <span className='h-1 w-1 rounded-full bg-black/30 dark:bg-white/30' />
                <span>Beauty · Travel</span>
              </div>
              <h1 className='text-3xl font-semibold tracking-tight sm:text-4xl'>
                {dict.nav.home} - K-DOC
              </h1>
              <p className='text-sm text-black/60 sm:text-base dark:text-white/60'>
                Current language: {lang}
              </p>

              {/* 언어 전환 */}
              <LanguageSwitcher currentLang={lang} />
            </div>
            <UserProfileWidget />
          </div>
        </header>

        <section className='space-y-4'>
          <h2 className='text-lg font-semibold'>Sample Section</h2>
          <div className='rounded-2xl border border-black/10 bg-white/60 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5'>
            <div className='space-y-4'>
              <p className='text-sm text-black/60 dark:text-white/60'>
                Welcome to the internationalized K-DOC platform! This is a sample page demonstrating
                the multi-language functionality.
              </p>

              {/* 샘플 버튼 */}
              <div className='flex gap-3'>
                <button className='rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none'>
                  {dict.products.cart}
                </button>

                {/* 로그인 버튼 */}
                <Link
                  href={`/${lang}/auth/login`}
                  className='rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
                >
                  Login / 로그인
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className='space-y-4'>
          <h2 className='text-lg font-semibold'>Language Information</h2>
          <div className='rounded-2xl border border-black/10 bg-white/60 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5'>
            <div className='space-y-2 text-sm'>
              <div className='flex items-center justify-between'>
                <span className='text-black/60 dark:text-white/60'>Current Language</span>
                <span className='font-medium'>{lang.toUpperCase()}</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-black/60 dark:text-white/60'>Home Text</span>
                <span className='font-medium'>{dict.nav.home}</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-black/60 dark:text-white/60'>Cart Button</span>
                <span className='font-medium'>{dict.products.cart}</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
