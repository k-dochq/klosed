'use client';

import { useState, useEffect } from 'react';
import { getTimeForTimezone, getTimeZoneOffset } from 'shared/lib/time';
import { TimeCard, TimeSkeleton } from 'entities/time';
import { TimeDifferenceTitle } from './TimeDifferenceTitle';
import { TimeDifferenceGrid } from './TimeDifferenceGrid';
import { TimeDifferenceInfo } from './TimeDifferenceInfo';
import type { Dictionary } from 'shared/model/types';

interface TimeDifferenceProps {
  dict: Dictionary;
}

export function TimeDifference({ dict }: TimeDifferenceProps) {
  const [seoulTime, setSeoulTime] = useState<ReturnType<typeof getTimeForTimezone> | null>(null);
  const [bangkokTime, setBangkokTime] = useState<ReturnType<typeof getTimeForTimezone> | null>(
    null,
  );

  const updateTimes = () => {
    setSeoulTime(getTimeForTimezone('Asia/Seoul'));
    setBangkokTime(getTimeForTimezone('Asia/Bangkok'));
  };

  useEffect(() => {
    // 초기 시간 설정
    updateTimes();

    // 매 분마다 업데이트
    const interval = setInterval(updateTimes, 60000);

    return () => clearInterval(interval);
  }, []);

  if (!seoulTime || !bangkokTime) {
    return (
      <div className='mx-auto max-w-2xl px-4 py-6'>
        <TimeDifferenceTitle dict={dict} />
        <TimeDifferenceGrid>
          <TimeSkeleton />
          <TimeSkeleton />
        </TimeDifferenceGrid>
      </div>
    );
  }

  const seoulOffset = getTimeZoneOffset('Asia/Seoul');
  const bangkokOffset = getTimeZoneOffset('Asia/Bangkok');

  return (
    <div className='mx-auto max-w-2xl px-4 py-6'>
      <TimeDifferenceTitle dict={dict} />
      <TimeDifferenceGrid>
        <TimeCard timeData={bangkokTime} cityName={dict.timeDifference.bangkok} />
        <TimeCard timeData={seoulTime} cityName={dict.timeDifference.seoul} />
      </TimeDifferenceGrid>
      <TimeDifferenceInfo seoulOffset={seoulOffset} bangkokOffset={bangkokOffset} dict={dict} />
    </div>
  );
}
