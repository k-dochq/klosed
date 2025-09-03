import { type Tour } from 'entities/tour/model/types';
import { TourTag } from './TourTag';

interface TourCardProps {
  tour: Tour;
}

export function TourCard({ tour }: TourCardProps) {
  return (
    <div className='relative aspect-[4/3] overflow-hidden bg-gradient-to-b from-gray-200 to-gray-300'>
      {/* 배경 이미지 */}
      <div
        className='absolute inset-0 bg-cover bg-center'
        style={{ backgroundImage: `url(${tour.image})` }}
      />

      {/* 그라데이션 오버레이 */}
      <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent' />

      {/* 콘텐츠 */}
      <div className='absolute right-0 bottom-0 left-0 p-6 text-white'>
        <p className='mb-2 text-sm opacity-90'>{tour.duration}</p>
        <h3 className='mb-4 text-2xl leading-tight font-bold'>{tour.title}</h3>

        {/* 태그들 */}
        <div className='flex flex-wrap gap-2'>
          {tour.tags.map((tag, index) => (
            <TourTag key={index} tag={tag} />
          ))}
        </div>
      </div>
    </div>
  );
}
