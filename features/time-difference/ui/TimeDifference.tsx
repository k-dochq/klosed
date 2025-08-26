'use client';

import { useState, useEffect } from 'react';
import { getTimeForTimezone } from 'shared/lib/time';
import { TimeCard, TimeSkeleton } from 'entities/time';
import { TimeDifferenceTitle } from './TimeDifferenceTitle';
import { TimeDifferenceGrid } from './TimeDifferenceGrid';

export function TimeDifference() {
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
        <TimeDifferenceTitle />
        <TimeDifferenceGrid>
          <TimeSkeleton />
          <TimeSkeleton />
        </TimeDifferenceGrid>
      </div>
    );
  }

  return (
    <div className='mx-auto max-w-2xl px-4 py-6'>
      <TimeDifferenceTitle />
      <TimeDifferenceGrid>
        <TimeCard timeData={bangkokTime} cityName='Bangkok' />
        <TimeCard timeData={seoulTime} cityName='Seoul' />
      </TimeDifferenceGrid>
    </div>
  );
}
