import { RefObject } from 'react';
import { LuxuryBackground, DiamondSeal } from 'entities/invitation';
import { SwipeToOpen } from 'features/invitation-swipe';
import { DiamondCenterpiece } from './DiamondCenterpiece';
import { LuxuryBorder } from './LuxuryBorder';
import { EnvelopeDecorations } from './EnvelopeDecorations';

interface EnvelopeInvitationProps {
  envelopeRef: RefObject<HTMLDivElement | null>;
  swipeAreaRef: RefObject<HTMLDivElement | null>;
  isDragging: boolean;
  dragProgress: number;
  isOpen: boolean;
}

export function EnvelopeInvitation({
  envelopeRef,
  swipeAreaRef,
  isDragging,
  dragProgress,
  isOpen,
}: EnvelopeInvitationProps) {
  return (
    <div
      ref={envelopeRef}
      className='relative'
      style={{
        width: '280px',
        height: '380px',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* 봉투 몸체 */}
      <div className='absolute inset-0 overflow-hidden rounded-lg shadow-2xl'>
        <LuxuryBackground />
        <LuxuryBorder />
        <DiamondCenterpiece />
        <EnvelopeDecorations />
        <DiamondSeal />
        <SwipeToOpen
          swipeAreaRef={swipeAreaRef}
          isDragging={isDragging}
          dragProgress={dragProgress}
          isOpen={isOpen}
        />
      </div>
    </div>
  );
}
