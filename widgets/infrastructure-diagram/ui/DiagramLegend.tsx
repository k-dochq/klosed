import React from 'react';
import { StatusBadge } from 'shared/ui/status-badge';

export function DiagramLegend() {
  return (
    <section className='mx-auto mb-4 flex max-w-[1200px] items-center gap-2'>
      <StatusBadge variant='current'>현재</StatusBadge>
      <StatusBadge variant='planned'>계획</StatusBadge>
    </section>
  );
}
