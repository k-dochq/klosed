import { Section } from 'shared/ui/section';
import { PackageCard } from 'entities/home';
import type { Package } from 'entities/home';
import type { Dictionary } from 'shared/model/types';

interface PackagesSectionProps {
  packages: Package[];
  dict: Dictionary['home']['sections']['packages'];
}

/**
 * 패키지 섹션 위젯
 * widgets 레이어 - 패키지 목록을 표시하는 복합 컴포넌트
 */
export function PackagesSection({ packages, dict }: PackagesSectionProps) {
  return (
    <Section title={dict.title}>
      {packages.length === 0 ? (
        <p className='text-sm text-black/60 dark:text-white/60'>{dict.empty}</p>
      ) : (
        <ul className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          {packages.map((pkg) => (
            <li key={pkg.id}>
              <PackageCard package={pkg} dict={dict} />
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}
