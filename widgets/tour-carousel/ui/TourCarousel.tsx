'use client';

import { useState } from 'react';
import { type Tour } from 'entities/tour';
import { TourCard } from 'entities/tour/ui';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselIndicators,
} from 'shared/ui/carousel';

interface TourCarouselProps {
  tours: Tour[];
}

export function TourCarousel({ tours }: TourCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className='mx-auto w-full'>
      <Carousel className='w-full'>
        <CarouselContent className='-ml-2 md:-ml-4'>
          {tours.map((tour) => (
            <CarouselItem key={tour.id} className='pl-2 md:pl-4'>
              <TourCard tour={tour} />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* 네비게이션 버튼 */}
        <CarouselPrevious className='left-2' />
        <CarouselNext className='right-2' />
      </Carousel>

      {/* 하단 점 표시기 */}
      <CarouselIndicators
        totalSlides={tours.length}
        currentSlide={currentSlide}
        onSlideChange={setCurrentSlide}
      />
    </div>
  );
}
