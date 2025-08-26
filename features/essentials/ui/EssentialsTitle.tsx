import type { Dictionary } from 'shared/model/types';

interface EssentialsTitleProps {
  dict: Dictionary;
}

export function EssentialsTitle({ dict }: EssentialsTitleProps) {
  return (
    <div className='mb-6'>
      <h1 className='mb-2 text-2xl font-bold text-gray-900'>{dict.essentials.title}</h1>
      <p className='text-sm text-gray-700'>{dict.essentials.subtitle}</p>
    </div>
  );
}
