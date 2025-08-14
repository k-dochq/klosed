import { useEffect, useRef, useState, RefObject } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

interface UseSwipeGestureProps {
  letterRef: RefObject<HTMLDivElement | null>;
  setIsOpen: (value: boolean) => void;
}

export function useSwipeGesture({ letterRef, setIsOpen }: UseSwipeGestureProps) {
  const swipeAreaRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragProgress, setDragProgress] = useState(0);

  useEffect(() => {
    if (!swipeAreaRef.current || !letterRef.current) return;

    // 초기 편지 위치 설정 (화면 중앙 아래에 숨김)
    gsap.set(letterRef.current, {
      y: '50vh', // 화면 높이의 50% 아래에 숨김
      opacity: 0,
      zIndex: -1,
    });

    // 화살표 드래그 기능 추가 (봉투 가로 길이에 맞춤)
    const containerWidth = 280 - 32; // 봉투 총 가로 - 양쪽 패딩 (16px씩)
    const maxDragDistance = containerWidth - 32; // 화살표 크기만큼 빼서 끝까지 갈 수 있게

    const draggable = Draggable.create(swipeAreaRef.current, {
      type: 'x',
      bounds: { minX: 0, maxX: maxDragDistance },
      onDragStart: () => {
        setIsDragging(true);
      },
      onDrag: function () {
        const progress = this.x / maxDragDistance;
        setDragProgress(progress);
      },
      onDragEnd: function () {
        setIsDragging(false);

        // 임계값 이상 드래그하면 편지가 완전히 나타남
        if (this.x > maxDragDistance * 0.6) {
          setIsOpen(true);

          // 화살표를 끝까지 이동
          gsap.to(swipeAreaRef.current, {
            x: maxDragDistance,
            duration: 0.3,
            ease: 'power2.out',
            onComplete: () => {
              // 잠시 후 화살표 숨기기
              gsap.to(swipeAreaRef.current, {
                opacity: 0,
                duration: 0.3,
                delay: 0.2,
              });
            },
          });

          // 편지가 화면 중앙으로 올라옴 (지연 후 시작)
          gsap.to(letterRef.current, {
            y: 0, // 화면 중앙 (top-1/2, -translate-y-1/2로 이미 중앙 정렬됨)
            opacity: 1,
            zIndex: 10,
            duration: 1.2,
            ease: 'power3.out',
            delay: 0.3, // 화살표 애니메이션 완료 후 시작
            onComplete: () => {
              // 편지 확대 애니메이션
              gsap.to(letterRef.current, {
                scale: 1.05,
                duration: 0.5,
                ease: 'power2.out',
                onComplete: () => {
                  setIsOpen(true); // 편지가 완전히 열렸을 때 상태 변경
                },
              });
            },
          });

          setDragProgress(1);
        } else {
          // 원위치로 복귀
          gsap.to(swipeAreaRef.current, {
            x: 0,
            duration: 0.5,
            ease: 'power2.out',
          });

          gsap.to(letterRef.current, {
            y: '50vh', // 다시 화면 아래로 숨김
            opacity: 0,
            scale: 1, // 확대 상태 초기화
            duration: 0.5,
            ease: 'power2.out',
            onComplete: () => {
              setIsOpen(false); // 편지가 닫혔을 때 상태 변경
            },
          });

          setDragProgress(0);
        }
      },
    });

    return () => {
      draggable[0].kill();
    };
  }, [setIsOpen]);

  return {
    swipeAreaRef,
    isDragging,
    dragProgress,
  };
}
