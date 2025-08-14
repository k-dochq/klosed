'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';

// GSAP 플러그인 등록
gsap.registerPlugin(Draggable);

const EnvelopeAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const swipeAreaRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragProgress, setDragProgress] = useState(0);
  const [invitationCode, setInvitationCode] = useState('');

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInvitationCode(e.target.value.toUpperCase());
  };

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

        // 스와이핑 도중에는 편지를 숨긴 상태로 유지
        // (편지 애니메이션은 onDragEnd에서만 실행)
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
  }, []);

  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4'>
      <div ref={containerRef} className='relative' style={{ perspective: '1000px' }}>
        {/* 봉투 컨테이너 */}
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
            {/* 그라데이션 배경 */}
            <div className='absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-black' />

            {/* 텍스처 오버레이 */}
            <div
              className='absolute inset-0 opacity-20'
              style={{
                backgroundImage: `
                  repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(255,255,255,0.03) 3px, rgba(255,255,255,0.03) 6px),
                  repeating-linear-gradient(-45deg, transparent, transparent 3px, rgba(255,255,255,0.03) 3px, rgba(255,255,255,0.03) 6px)
                `,
              }}
            />

            {/* 외부 골드 테두리 */}
            <div className='absolute inset-0 rounded-lg border-2 border-yellow-400/70 bg-gradient-to-br from-yellow-400/5 via-transparent to-yellow-600/5'>
              {/* 내부 테두리 */}
              <div className='absolute inset-3 rounded-sm border border-yellow-300/30'>
                {/* 모서리 장식 */}
                <div className='absolute -top-1 -left-1 h-6 w-6 border-t-2 border-l-2 border-yellow-400/60' />
                <div className='absolute -top-1 -right-1 h-6 w-6 border-t-2 border-r-2 border-yellow-400/60' />
                <div className='absolute -bottom-1 -left-1 h-6 w-6 border-b-2 border-l-2 border-yellow-400/60' />
                <div className='absolute -right-1 -bottom-1 h-6 w-6 border-r-2 border-b-2 border-yellow-400/60' />
              </div>
            </div>

            {/* 중앙 장식 패턴 */}
            <div className='absolute inset-0 flex items-center justify-center'>
              <div className='relative'>
                {/* 배경 원형 장식 */}
                <div className='bg-gradient-radial absolute -inset-8 rounded-full from-yellow-400/10 via-transparent to-transparent' />

                {/* Beauty 텍스트 박스 */}
                <div className='relative border border-yellow-400/30 bg-black/40 px-10 py-6 backdrop-blur-sm sm:px-12 sm:py-8'>
                  <div className='absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent' />
                  <div className='absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent' />

                  <h2 className='mb-2 text-center font-serif text-xl tracking-[0.25em] text-yellow-400 sm:text-2xl sm:tracking-[0.3em]'>
                    BEAUTY
                  </h2>
                  <div className='my-2 h-px w-full bg-yellow-400/40' />
                  <p className='text-center text-[9px] tracking-[0.35em] text-yellow-300/80 sm:text-[10px] sm:tracking-[0.4em]'>
                    INVITATION
                  </p>
                </div>
              </div>
            </div>

            {/* 하단 장식 */}
            <div className='absolute right-0 bottom-8 left-0'>
              <div className='flex items-center justify-center space-x-4'>
                <div className='h-px w-12 bg-gradient-to-r from-transparent to-yellow-400/50' />
                <div className='h-2 w-2 rounded-full bg-yellow-400/60' />
                <div className='h-px w-12 bg-gradient-to-l from-transparent to-yellow-400/50' />
              </div>
            </div>

            {/* 왕관 씰 */}
            <div className='absolute bottom-16 left-1/2 -translate-x-1/2'>
              <div className='relative'>
                <div className='flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 shadow-xl'>
                  <div className='flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500'>
                    <div className='flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-yellow-200 to-yellow-400'>
                      {/* 왕관 아이콘 */}
                      <svg
                        className='h-5 w-5 text-yellow-800'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path d='M5 3l1.5 3L10 4l3.5 2L15 3l1 9H4l1-9z' />
                      </svg>
                    </div>
                  </div>
                </div>
                {/* 씰 광채 효과 */}
                <div className='absolute inset-0 animate-pulse rounded-full bg-yellow-400/20 blur-lg' />
              </div>
            </div>

            {/* 스와이프 트랙 - 봉투 가로 전체 */}
            <div className='absolute top-12 right-4 left-4 flex h-10 items-center'>
              {/* 점선 트랙 (고정) */}
              <div className='absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 border-t-2 border-dashed border-yellow-400/60' />

              {/* 진행도 표시선 */}
              <div
                className='absolute top-1/2 h-0.5 -translate-y-1/2 bg-yellow-400/80 transition-all duration-100'
                style={{
                  left: 0,
                  width: `${dragProgress * 100}%`,
                }}
              />

              {/* 힌트 텍스트 - 중앙에 위치 */}
              {!isDragging && !isOpen && (
                <div className='absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-center'>
                  <span className='animate-pulse rounded-full border border-yellow-400/30 bg-black/60 px-3 py-1 text-xs text-yellow-400 backdrop-blur-sm'>
                    Swipe to Open
                  </span>
                </div>
              )}
            </div>

            {/* 드래그 가능한 화살표 */}
            <div
              ref={swipeAreaRef}
              className={`absolute top-12 left-4 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
              style={{
                width: '32px',
                height: '40px',
                zIndex: 20,
              }}
            >
              <div className='absolute top-1/2 left-0 -translate-y-1/2'>
                {/* 화살표 아이콘 */}
                <div className='flex h-8 w-8 items-center justify-center rounded-full border border-yellow-400/40 bg-yellow-400/30 shadow-lg backdrop-blur-sm transition-all duration-200 hover:border-yellow-400/60 hover:bg-yellow-400/40'>
                  <svg
                    className='h-4 w-4 text-yellow-400'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2.5}
                      d='M14 5l7 7m0 0l-7 7m7-7H3'
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 편지 */}
        <div
          ref={letterRef}
          className='absolute top-1/2 left-1/2 w-[calc(100vw-2rem)] max-w-[360px] -translate-x-1/2 -translate-y-1/2 sm:w-[calc(100vw-4rem)] md:w-[360px]'
          style={{
            transformOrigin: 'center center',
            pointerEvents: isOpen ? 'auto' : 'none', // 편지가 열렸을 때만 클릭 가능
          }}
        >
          <div className='relative rounded-md bg-gradient-to-b from-white via-[#fffef9] to-white shadow-2xl'>
            {/* 편지 테두리 장식 */}
            <div className='absolute inset-0 rounded-md border-2 border-yellow-400/20'>
              <div className='absolute inset-1 rounded-sm border border-yellow-300/10' />
            </div>

            {/* 편지 내용 */}
            <div className='relative p-6 sm:p-8 md:p-12'>
              {/* 상단 장식 */}
              <div className='mb-6 text-center sm:mb-8'>
                <div className='mx-auto mb-4 h-px w-16 bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent sm:mb-6 sm:w-24' />
                <h1 className='mb-3 font-serif text-xl tracking-wide text-gray-800 sm:mb-4 sm:text-2xl md:text-3xl'>
                  Exclusive Beauty Journey
                </h1>
                <div className='mx-auto h-px w-16 bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent sm:w-24' />
              </div>

              {/* 본문 */}
              <div className='space-y-4 text-gray-700'>
                <p className='text-center text-xs leading-relaxed font-medium tracking-wider sm:text-sm'>
                  PREMIUM MEDICAL TOURISM
                </p>

                <div className='py-3 sm:py-4'>
                  <p className='text-center text-sm leading-loose sm:text-base'>
                    Experience world-class cosmetic surgery
                    <br />
                    in Seoul with VIP treatment
                  </p>
                </div>

                {/* 초대코드 입력 섹션 */}
                <div className='my-6 rounded-lg border-2 border-yellow-400/30 bg-gradient-to-r from-yellow-50/50 to-amber-50/50 p-4 sm:p-6'>
                  <div className='text-center'>
                    <p className='mb-3 text-xs font-medium text-gray-700 sm:text-sm'>
                      Enter Your Exclusive Invitation Code
                    </p>
                    <div className='mx-auto max-w-xs'>
                      <input
                        type='text'
                        placeholder='BEAUTY2024'
                        value={invitationCode}
                        onChange={handleCodeChange}
                        maxLength={12}
                        className='w-full rounded-md border border-yellow-400/40 bg-white px-4 py-2 text-center font-mono text-sm tracking-widest text-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-400/20 focus:outline-none'
                      />
                    </div>
                    <p className='mt-2 text-xs text-gray-500'>
                      Code required for package activation
                    </p>
                  </div>
                </div>
              </div>

              {/* 하단 서명 */}
              <div className='mt-4 text-center sm:mt-6'>
                <div className='inline-block'>
                  <p className='font-serif text-sm text-gray-700 sm:text-base'>
                    Seoul Beauty Institute
                  </p>
                  <p className='mt-1 text-xs text-gray-500'>International Medical Tourism</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnvelopeAnimation;
