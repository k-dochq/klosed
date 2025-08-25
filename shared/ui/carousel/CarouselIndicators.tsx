import { cn } from 'shared/lib/utils';

interface CarouselIndicatorsProps {
  totalSlides: number;
  currentSlide?: number;
  onSlideChange?: (index: number) => void;
}

export function CarouselIndicators({
  totalSlides,
  currentSlide = 0,
  onSlideChange,
}: CarouselIndicatorsProps) {
  return (
    <div className='mt-4 flex justify-center gap-2'>
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          onClick={() => onSlideChange?.(index)}
          className={cn(
            'h-2 w-2 rounded-full transition-colors',
            currentSlide === index ? 'bg-gray-900' : 'bg-gray-300 hover:bg-gray-500',
          )}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
}
