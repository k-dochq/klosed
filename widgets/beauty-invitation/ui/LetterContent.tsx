import { RefObject } from 'react';
import { InvitationCodeInput } from 'features/invitation-code';

interface LetterContentProps {
  letterRef: RefObject<HTMLDivElement | null>;
  isOpen: boolean;
  invitationCode: string;
  onCodeChange: (value: string) => void;
}

export function LetterContent({
  letterRef,
  isOpen,
  invitationCode,
  onCodeChange,
}: LetterContentProps) {
  return (
    <div
      ref={letterRef}
      className='absolute top-1/2 left-1/2 w-[calc(100vw-2rem)] max-w-[360px] -translate-x-1/2 -translate-y-1/2 sm:w-[calc(100vw-4rem)] md:w-[360px]'
      style={{
        transformOrigin: 'center center',
        pointerEvents: isOpen ? 'auto' : 'none',
      }}
    >
      <div className='relative rounded-lg bg-gradient-to-b from-white via-[#fffef9] to-[#fff8e7] shadow-2xl'>
        {/* 화려한 편지 테두리 장식 */}
        <div className='absolute inset-0 rounded-lg border-2 border-yellow-400/30'>
          <div className='absolute inset-1 rounded-md border border-yellow-300/20'>
            <div className='absolute inset-1 rounded-sm border border-yellow-200/15' />
          </div>
        </div>

        {/* 편지 모서리 장식 */}
        <div className='absolute top-2 left-2 h-4 w-4 border-t-2 border-l-2 border-yellow-400/40' />
        <div className='absolute top-2 right-2 h-4 w-4 border-t-2 border-r-2 border-yellow-400/40' />
        <div className='absolute bottom-2 left-2 h-4 w-4 border-b-2 border-l-2 border-yellow-400/40' />
        <div className='absolute right-2 bottom-2 h-4 w-4 border-r-2 border-b-2 border-yellow-400/40' />

        {/* 편지 배경 패턴 */}
        <div
          className='absolute inset-0 rounded-lg opacity-5'
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(255,215,0,0.3) 0%, transparent 25%),
              radial-gradient(circle at 75% 75%, rgba(255,215,0,0.2) 0%, transparent 25%),
              linear-gradient(45deg, transparent 49%, rgba(255,215,0,0.1) 50%, transparent 51%)
            `,
            backgroundSize: '60px 60px, 80px 80px, 30px 30px',
          }}
        />

        {/* 편지 내용 */}
        <div className='relative p-6 sm:p-8 md:p-12'>
          {/* 화려한 상단 장식 */}
          <div className='mb-6 text-center sm:mb-8'>
            {/* 상단 장식 라인 */}
            <div className='mx-auto mb-4 flex items-center justify-center space-x-2 sm:mb-6'>
              <div className='h-px w-6 bg-gradient-to-r from-transparent to-yellow-400/60 sm:w-8' />
              <div className='h-1 w-1 rotate-45 bg-yellow-400/80' />
              <div className='h-px w-8 bg-yellow-400/60 sm:w-12' />
              <div className='h-1 w-1 rotate-45 bg-yellow-400/80' />
              <div className='h-px w-6 bg-gradient-to-l from-transparent to-yellow-400/60 sm:w-8' />
            </div>

            <h1 className='mb-3 font-serif text-xl tracking-wide text-gray-800 sm:mb-4 sm:text-2xl md:text-3xl'>
              <span className='relative'>
                Exclusive Beauty Journey
                {/* 텍스트 하이라이트 효과 */}
                <div className='absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent' />
              </span>
            </h1>

            {/* 하단 장식 라인 */}
            <div className='mx-auto flex items-center justify-center space-x-2'>
              <div className='h-px w-6 bg-gradient-to-r from-transparent to-yellow-400/60 sm:w-8' />
              <div className='h-1 w-1 rotate-45 bg-yellow-400/80' />
              <div className='h-px w-8 bg-yellow-400/60 sm:w-12' />
              <div className='h-1 w-1 rotate-45 bg-yellow-400/80' />
              <div className='h-px w-6 bg-gradient-to-l from-transparent to-yellow-400/60 sm:w-8' />
            </div>
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

            <InvitationCodeInput invitationCode={invitationCode} onCodeChange={onCodeChange} />
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
  );
}
