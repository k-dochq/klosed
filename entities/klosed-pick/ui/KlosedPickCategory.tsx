import { type KlosedPickCategory } from 'entities/klosed-pick/model/types';
import { KlosedPickItem } from './KlosedPickItem';
import { Carousel, CarouselContent, CarouselItem } from 'shared/ui/carousel';

interface KlosedPickCategoryProps {
  category: KlosedPickCategory;
}

export function KlosedPickCategory({ category }: KlosedPickCategoryProps) {
  return (
    <div className='mb-8'>
      <h3 className='mb-4 text-lg font-semibold'>{category.category}</h3>

      <Carousel
        className='w-full select-none'
        opts={{
          align: 'start',
          containScroll: 'trimSnaps',
        }}
      >
        <CarouselContent className='-ml-2'>
          {category.items.map((item) => (
            <CarouselItem key={item.id} className='max-w-sm basis-4/5 pl-2 select-none'>
              <KlosedPickItem item={item} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
