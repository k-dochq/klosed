import { RefObject, useState } from 'react';

interface UseEnvelopeAnimationProps {
  letterRef: RefObject<HTMLDivElement | null>;
}

export function useEnvelopeAnimation({ letterRef }: UseEnvelopeAnimationProps) {
  const [isOpen, setIsOpen] = useState(false);

  return {
    isOpen,
    setIsOpen,
  };
}
