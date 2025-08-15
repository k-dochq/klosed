import React from 'react';
import { InfraDiagram } from 'widgets/infrastructure-diagram';

export default function Page() {
  return (
    <main className='min-h-screen bg-white px-6 py-10 font-sans text-slate-800'>
      <header className='mx-auto mb-6 max-w-[1200px]'>
        <h1 className='text-3xl font-extrabold tracking-tight'>KDOC 인프라 구성도</h1>
        <p className='mt-2 text-slate-600'>Vercel + Supabase 기반 아키텍처 (현재 + 확장 계획)</p>
      </header>

      <InfraDiagram />
    </main>
  );
}
