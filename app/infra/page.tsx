import React from 'react';
import {
  Monitor,
  Cloud,
  Server,
  Database,
  Shield,
  Bolt,
  Clock,
  Flag,
  Upload,
  Activity,
  Settings,
  Link2,
  Code2,
} from 'lucide-react';

export default function Page() {
  return (
    <main className='min-h-screen font-sans px-6 py-10 bg-white text-slate-800'>
      <header className='max-w-[1200px] mx-auto mb-6'>
        <h1 className='text-3xl font-extrabold tracking-tight'>KDOC 인프라 구성도</h1>
        <p className='text-slate-600 mt-2'>Vercel + Supabase 기반 아키텍처 (현재 + 확장 계획)</p>
      </header>

      {/* Legend */}
      <section className='max-w-[1200px] mx-auto mb-4 flex items-center gap-2'>
        <span className='inline-flex items-center gap-2 rounded-md border border-blue-500/40 bg-blue-50 px-3 py-1 text-xs text-blue-700'>
          현재
        </span>
        <span className='inline-flex items-center gap-2 rounded-md border border-amber-500/40 bg-amber-50 px-3 py-1 text-xs text-amber-800'>
          계획
        </span>
      </section>

      {/* Diagram */}
      <section className='max-w-[1200px] mx-auto relative'>
        {/* Swimlanes */}
        <div className='grid grid-cols-[1fr_64px_1.2fr_64px_1fr] gap-4'>
          {/* Client lane */}
          <div className='col-span-1 rounded-xl border border-slate-200 bg-slate-50 p-4'>
            <div className='text-slate-700 font-bold mb-3'>Client</div>
            {/* Browser */}
            <div className='rounded-xl border border-blue-500/40 bg-white shadow-sm p-4 mb-4'>
              <div className='flex items-center gap-2 font-semibold'>
                <Monitor className='w-5 h-5 text-blue-600' />
                사용자 브라우저
              </div>
              <div className='text-xs text-slate-500 mt-1'>HTTPS/TLS</div>
            </div>
          </div>

          {/* Connector between Client and Vercel CDN */}
          <div className='col-span-1 relative hidden lg:block'>
            <svg
              className='absolute left-0 right-0 top-[84px] w-full h-6'
              viewBox='0 0 64 24'
              fill='none'
            >
              <path
                d='M0,12 C20,0 44,24 64,12'
                stroke='currentColor'
                className='text-slate-400'
                strokeWidth='2'
                fill='none'
              />
            </svg>
          </div>

          {/* Vercel lane */}
          <div className='col-span-1 rounded-xl border border-slate-200 bg-slate-50 p-4'>
            <div className='text-slate-700 font-bold mb-3'>Vercel</div>

            {/* CDN */}
            <div className='rounded-xl border border-slate-300 bg-white shadow-sm p-4 mb-4'>
              <div className='flex items-center gap-2 font-semibold'>
                <Cloud className='w-5 h-5 text-slate-600' />
                CDN (Edge Network)
              </div>
              <div className='text-xs text-slate-500 mt-1'>Vercel Edge</div>
            </div>

            {/* Next.js App */}
            <div className='rounded-xl border border-blue-500/40 bg-white shadow-sm p-4 mb-4'>
              <div className='flex items-center gap-2 font-semibold'>
                <Server className='w-5 h-5 text-blue-600' />
                Next.js 앱
              </div>
              <ul className='mt-1 text-sm text-slate-600 list-disc pl-5 space-y-1'>
                <li>RSC + Route Handlers</li>
                <li>런타임: Node 22.x</li>
                <li>리전: icn1</li>
              </ul>
            </div>

            {/* API Routes */}
            <div className='rounded-xl border border-blue-500/40 bg-white shadow-sm p-4 mb-2'>
              <div className='flex items-center gap-2 font-semibold'>
                <Server className='w-5 h-5 text-blue-600' />
                API Routes
              </div>
              <ul className='mt-1 text-sm text-slate-600 list-disc pl-5 space-y-1'>
                <li>서버리스 함수</li>
                <li>JWT/SDK/REST/GraphQL → Supabase</li>
                <li>
                  <span className='inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-blue-200 bg-blue-50 text-[11px]'>
                    <Code2 className='w-3.5 h-3.5' /> Prisma
                  </span>{' '}
                  → Postgres
                </li>
              </ul>
            </div>

            {/* Planned stack */}
            <div className='grid gap-2 mt-3'>
              <div className='rounded-xl border border-amber-400/60 bg-amber-50 p-3'>
                <div className='text-sm font-semibold inline-flex items-center gap-2'>
                  <Flag className='w-4 h-4 text-amber-700' /> Edge Middleware
                </div>
                <div className='text-xs text-amber-700'>라우트 기반</div>
              </div>
              <div className='rounded-xl border border-amber-400/60 bg-amber-50 p-3'>
                <div className='text-sm font-semibold inline-flex items-center gap-2'>
                  <Bolt className='w-4 h-4 text-amber-700' /> Edge Functions
                </div>
                <div className='text-xs text-amber-700'>스트리밍/저지연</div>
              </div>
              <div className='rounded-xl border border-amber-400/60 bg-amber-50 p-3'>
                <div className='text-sm font-semibold inline-flex items-center gap-2'>
                  <Clock className='w-4 h-4 text-amber-700' /> Vercel Cron
                </div>
                <div className='text-xs text-amber-700'>스케줄 작업</div>
              </div>
              <div className='rounded-xl border border-amber-400/60 bg-amber-50 p-3'>
                <div className='text-sm font-semibold inline-flex items-center gap-2'>
                  <Settings className='w-4 h-4 text-amber-700' /> Edge Config
                </div>
                <div className='text-xs text-amber-700'>기능 플래그</div>
              </div>
            </div>
          </div>

          {/* Connector between API Routes and Supabase API */}
          <div className='col-span-1 relative hidden lg:block'>
            <svg
              className='absolute left-0 right-0 top-[324px] w-full h-6'
              viewBox='0 0 64 24'
              fill='none'
            >
              <path
                d='M0,12 C20,0 44,24 64,12'
                stroke='currentColor'
                className='text-slate-400'
                strokeWidth='2'
                fill='none'
              />
            </svg>
          </div>

          {/* Supabase lane */}
          <div className='col-span-1 rounded-xl border border-slate-200 bg-slate-50 p-4'>
            <div className='text-slate-700 font-bold mb-3'>Supabase</div>

            {/* API Gateway */}
            <div className='rounded-xl border border-blue-500/40 bg-white shadow-sm p-4 mb-4'>
              <div className='flex items-center gap-2 font-semibold'>
                <Server className='w-5 h-5 text-blue-600' />
                API 게이트웨이
              </div>
              <div className='text-xs text-slate-500 mt-1'>Auth · PostgREST · GraphQL</div>
            </div>

            {/* Postgres */}
            <div className='rounded-xl border border-slate-300 bg-white shadow-sm p-4 mb-3'>
              <div className='flex items-center gap-2 font-semibold'>
                <Database className='w-5 h-5 text-slate-600' />
                Postgres (관리형)
              </div>
              <ul className='mt-1 text-sm text-slate-600 list-disc pl-5 space-y-1'>
                <li>테이블: 10개, RLS: 비활성</li>
                <li>Enums: Booking/Payment/Product</li>
                <li>확장: graphql/stat/crypto/uuid</li>
              </ul>
            </div>

            {/* Planned Supabase */}
            <div className='grid gap-2'>
              <div className='rounded-xl border border-amber-400/60 bg-amber-50 p-3'>
                <div className='text-sm font-semibold inline-flex items-center gap-2'>
                  <Shield className='w-4 h-4 text-amber-700' /> 인증(Auth)
                </div>
                <div className='text-xs text-amber-700'>이메일 OTP · OAuth(구글/깃허브/애플)</div>
              </div>
              <div className='rounded-xl border border-amber-400/60 bg-amber-50 p-3'>
                <div className='text-sm font-semibold inline-flex items-center gap-2'>
                  <Activity className='w-4 h-4 text-amber-700' /> Realtime
                </div>
                <div className='text-xs text-amber-700'>라이브 업데이트</div>
              </div>
              <div className='rounded-xl border border-amber-400/60 bg-amber-50 p-3'>
                <div className='text-sm font-semibold inline-flex items-center gap-2'>
                  <Upload className='w-4 h-4 text-amber-700' /> 스토리지 버킷
                </div>
                <div className='text-xs text-amber-700'>assets, uploads (공개/비공개)</div>
              </div>
              <div className='rounded-xl border border-amber-400/60 bg-amber-50 p-3'>
                <div className='text-sm font-semibold inline-flex items-center gap-2'>
                  <Bolt className='w-4 h-4 text-amber-700' /> Edge Functions
                </div>
                <div className='text-xs text-amber-700'>웹훅/스케줄</div>
              </div>
            </div>
          </div>
        </div>

        {/* Aliases */}
        <div className='mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4'>
          <div className='text-slate-700 font-bold mb-2 inline-flex items-center gap-2'>
            <Link2 className='w-4 h-4' /> 별칭(Alias)
          </div>
          <ul className='text-sm text-slate-700 space-y-1'>
            <li className='flex items-center gap-2'>
              <Link2 className='w-3.5 h-3.5 text-slate-500' /> kdoc.vercel.app (프로덕션)
            </li>
            <li className='flex items-center gap-2'>
              <Link2 className='w-3.5 h-3.5 text-slate-500' /> kdoc-k-docs-projects.vercel.app
            </li>
            <li className='flex items-center gap-2'>
              <Link2 className='w-3.5 h-3.5 text-slate-500' />{' '}
              kdoc-git-main-k-docs-projects.vercel.app
            </li>
            <li className='flex items-center gap-2'>
              <Link2 className='w-3.5 h-3.5 text-slate-500' />{' '}
              kdoc-git-develop-k-docs-projects.vercel.app
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
