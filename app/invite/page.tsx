'use client';

import React, { useRef } from 'react';
import { useInvitationCode } from 'features/invitation-code';
import { useSwipeGesture } from 'features/invitation-swipe';
import { EnvelopeInvitation, LetterContent, useEnvelopeAnimation } from 'widgets/beauty-invitation';

const EnvelopeAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);

  const { invitationCode, handleCodeChange } = useInvitationCode();
  const { isOpen, setIsOpen } = useEnvelopeAnimation({ letterRef });
  const { swipeAreaRef, isDragging, dragProgress } = useSwipeGesture({
    letterRef,
    setIsOpen,
  });

  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4'>
      <div ref={containerRef} className='relative' style={{ perspective: '1000px' }}>
        <EnvelopeInvitation
          envelopeRef={envelopeRef}
          swipeAreaRef={swipeAreaRef}
          isDragging={isDragging}
          dragProgress={dragProgress}
          isOpen={isOpen}
        />

        <LetterContent
          letterRef={letterRef}
          isOpen={isOpen}
          invitationCode={invitationCode}
          onCodeChange={handleCodeChange}
        />
      </div>
    </div>
  );
};

export default EnvelopeAnimation;
