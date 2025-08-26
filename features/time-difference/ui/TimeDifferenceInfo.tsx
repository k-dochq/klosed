import type { Dictionary } from 'shared/model/types';

interface TimeDifferenceInfoProps {
  seoulOffset: number;
  bangkokOffset: number;
  dict: Dictionary;
  className?: string;
}

export function TimeDifferenceInfo({ dict, className = '' }: TimeDifferenceInfoProps) {
  return (
    <div className={`mt-4 text-center text-sm text-gray-600 ${className}`}>
      {dict.timeDifference.difference}
    </div>
  );
}
