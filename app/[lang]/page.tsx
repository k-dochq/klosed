import { getDictionary } from './dictionaries';
import { UserProfileWidget } from 'widgets/user-profile';
import { LanguageSwitcher } from 'shared/ui/language-switcher';
import {
  PackagesSection,
  ItinerarySection,
  BookingSection,
  NavigationSection,
} from 'widgets/home-sections';
import { HomeRepository } from 'shared/lib/repositories';
import { type Locale } from 'shared/config';

export default async function Page({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const homeRepository = new HomeRepository();
  const homeData = await homeRepository.findHomeData();

  return (
    <div className='min-h-screen bg-gradient-to-b from-neutral-50 to-white text-neutral-900 dark:from-neutral-900 dark:to-neutral-950 dark:text-neutral-100'>
      <div className='mx-auto w-full max-w-5xl space-y-12 px-6 py-10 sm:py-14'>
        <header className='space-y-3'>
          <div className='flex items-center justify-between'>
            <div className='space-y-3'>
              <div className='inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs text-black/60 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-white/70'>
                <span>{dict.home.brand.name}</span>
                <span className='h-1 w-1 rounded-full bg-black/30 dark:bg-white/30' />
                <span>{dict.home.brand.categories}</span>
              </div>
              <h1 className='text-3xl font-semibold tracking-tight sm:text-4xl'>
                {dict.home.title}
              </h1>
              <p className='text-sm text-black/60 sm:text-base dark:text-white/60'>
                {dict.home.subtitle}
              </p>

              {/* 언어 전환 */}
              <LanguageSwitcher currentLang={lang} />
            </div>
            <UserProfileWidget />
          </div>
        </header>

        {/* FSD Architecture: Widgets 레이어의 복합 컴포넌트들 */}
        <PackagesSection packages={homeData.packages} dict={dict.home.sections.packages} />

        <ItinerarySection
          itinerary={homeData.latestItinerary}
          dict={dict.home.sections.itinerary}
        />

        <BookingSection
          booking={homeData.latestBooking}
          creditBalance={homeData.creditBalance}
          dict={dict.home.sections.booking}
        />

        <NavigationSection lang={lang} dict={dict.auth.login} />
      </div>
    </div>
  );
}
