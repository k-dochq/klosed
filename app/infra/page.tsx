import React from 'react';
import { InfraCanvas } from './InfraCanvas';

export default function Page() {
  return (
    <main className='min-h-screen font-sans px-6 py-10'>
      <header className='max-w-[1200px] mx-auto mb-3'>
        <h1 className='text-3xl font-extrabold tracking-tight'>KDOC 인프라 구성도</h1>
        <p className='text-slate-700 mt-1'>Vercel + Supabase 기반 아키텍처 (현재 + 확장 계획)</p>
      </header>

      <section className='max-w-[1200px] mx-auto grid grid-cols-1 lg:[grid-template-columns:1fr_56px_1fr] gap-4 items-start'>
        <div className='col-span-1 lg:col-span-3'>
          <InfraCanvas />
        </div>
      </section>
    </main>
  );
}
