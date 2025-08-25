import { type KlosedPicksData } from 'entities/klosed-pick';
import { KlosedPickCategory } from 'entities/klosed-pick/ui';

interface KlosedPicksProps {
  data: KlosedPicksData;
}

export function KlosedPicks({ data }: KlosedPicksProps) {
  return (
    <div className='mx-auto w-full px-4 py-6'>
      {/* 메인 타이틀 */}
      <h2 className='mb-6 text-2xl font-bold'>{data.title}</h2>

      {/* 각 카테고리별 캐러셀 */}
      {data.categories.map((category, sectionIndex) => (
        <KlosedPickCategory key={sectionIndex} category={category} />
      ))}
    </div>
  );
}
