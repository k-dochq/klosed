import { LocaleLink } from 'shared/ui/locale-link';
import { type Locale } from 'shared/config/locales';

interface PageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function OnboardingPage({ params }: PageProps) {
  const { lang } = await params;

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50'>
      <div className='space-y-6 text-center'>
        <h1 className='mb-8 text-3xl font-bold text-gray-900'>Welcome to Klosed</h1>

        <div className='space-y-4'>
          {/* Button 'a': Join Klosed */}
          <LocaleLink
            href='/auth/invite'
            className='block w-80 rounded-lg bg-black px-6 py-4 text-center text-white transition-colors hover:bg-gray-800'
          >
            <span className='mr-3 inline-flex h-6 w-6 items-center justify-center rounded-full bg-yellow-400 text-sm font-bold text-black'>
              a
            </span>
            Join Klosed
          </LocaleLink>

          {/* Button 'b': Already a member */}
          <LocaleLink
            href='/auth/existing-account-login'
            className='block w-80 rounded-lg bg-black px-6 py-4 text-center text-white transition-colors hover:bg-gray-800'
          >
            <span className='mr-3 inline-flex h-6 w-6 items-center justify-center rounded-full bg-yellow-400 text-sm font-bold text-black'>
              b
            </span>
            Already a member
          </LocaleLink>

          {/* Button 'c': Skip and look around */}
          <LocaleLink
            href='/'
            className='block w-80 rounded-lg bg-black px-6 py-4 text-center text-white transition-colors hover:bg-gray-800'
          >
            <span className='mr-3 inline-flex h-6 w-6 items-center justify-center rounded-full bg-yellow-400 text-sm font-bold text-black'>
              c
            </span>
            Skip and look around
          </LocaleLink>
        </div>
      </div>
    </div>
  );
}
