import type { Dictionary } from 'shared/model/types';

interface TimeDifferenceTitleProps {
  dict: Dictionary;
}

export function TimeDifferenceTitle({ dict }: TimeDifferenceTitleProps) {
  return <h1 className='mb-6 text-2xl font-bold text-gray-900'>{dict.timeDifference.title}</h1>;
}
