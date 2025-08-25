import { TourCarousel } from 'widgets/tour-carousel';
import { createLocalizedTours } from 'entities/tour';
import { getDictionary } from '../dictionaries';
import { type Locale } from 'shared/config';

interface PageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function Page({ params }: PageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const localizedTours = createLocalizedTours(dict.tours);

  return (
    <div>
      <TourCarousel tours={localizedTours} />
    </div>
  );
}
