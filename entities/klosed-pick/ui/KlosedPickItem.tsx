import { type KlosedPickItem } from '../model/types';

interface KlosedPickItemProps {
  item: KlosedPickItem;
}

export function KlosedPickItem({ item }: KlosedPickItemProps) {
  return (
    <div className='group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-xl bg-gray-200 select-none'>
      {/* 이미지 */}
      <img
        src={item.image}
        alt={item.title}
        className='h-full w-full object-cover transition-transform duration-300 select-none group-hover:scale-105'
      />

      {/* 그라데이션 오버레이 */}
      <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent' />

      {/* 아이콘 (좌상단) */}
      <div className='absolute top-3 left-3'>
        <div className='h-8 w-8 rounded-md bg-black/30 backdrop-blur-sm' />
      </div>

      {/* 타이틀 (하단) */}
      <div className='absolute right-0 bottom-0 left-0 p-4'>
        <h4 className='text-lg leading-tight font-semibold text-white'>{item.title}</h4>
      </div>
    </div>
  );
}
