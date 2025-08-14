export function LuxuryBackground() {
  return (
    <>
      {/* 메인 배경 그라데이션 */}
      <div className='absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-black' />

      {/* 고급스러운 무늬 패턴 */}
      <div
        className='absolute inset-0 opacity-15'
        style={{
          backgroundImage: `
            repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(255,255,255,0.05) 4px, rgba(255,255,255,0.05) 8px),
            repeating-linear-gradient(-45deg, transparent, transparent 4px, rgba(255,255,255,0.05) 4px, rgba(255,255,255,0.05) 8px),
            radial-gradient(circle at 25% 25%, rgba(255,215,0,0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(255,215,0,0.08) 0%, transparent 50%)
          `,
        }}
      />

      {/* 다이아몬드 패턴 텍스처 */}
      <div
        className='absolute inset-0 opacity-8'
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 1px, transparent 1px),
            radial-gradient(circle at 80% 70%, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(45deg, transparent 45%, rgba(255,215,0,0.02) 50%, transparent 55%)
          `,
          backgroundSize: '40px 40px, 35px 35px, 20px 20px',
        }}
      />
    </>
  );
}
