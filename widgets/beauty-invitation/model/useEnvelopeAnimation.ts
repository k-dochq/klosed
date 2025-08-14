import { RefObject, useState, useEffect } from 'react';
import { gsap } from 'gsap';

interface UseEnvelopeAnimationProps {
  letterRef: RefObject<HTMLDivElement | null>;
  envelopeRef: RefObject<HTMLDivElement | null>;
}

export function useEnvelopeAnimation({ letterRef, envelopeRef }: UseEnvelopeAnimationProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!envelopeRef.current) return;

    // 봉투 초기 상태 설정 (화면 위에서 숨김)
    gsap.set(envelopeRef.current, {
      y: -100,
      opacity: 0,
      scale: 0.8,
    });

    // 봉투 등장 애니메이션 (바운스 효과)
    gsap.to(envelopeRef.current, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: 'bounce.out',
      delay: 0.3,
    });
  }, [envelopeRef]);

  return {
    isOpen,
    setIsOpen,
  };
}
