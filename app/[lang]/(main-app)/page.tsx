import { TourCarousel } from 'widgets/tour-carousel';
import { tourPackages } from 'entities/tour';

export default function Page() {
  return (
    <div className=''>
      <TourCarousel tours={tourPackages} />
    </div>
  );
}
