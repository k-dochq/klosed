'use client';

import React, { useEffect, useRef } from 'react';

type BoxStyle = {
  fill: string;
  stroke: string;
  text: string;
  dashed?: boolean;
};

function drawIcon(
  ctx: CanvasRenderingContext2D,
  type: string,
  x: number,
  y: number,
  color: string,
) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 1.8;
  switch (type) {
    case 'db': {
      const w = 28,
        h = 24;
      ctx.beginPath();
      ctx.ellipse(x + w / 2, y + 6, w / 2, 6, 0, 0, Math.PI * 2);
      ctx.moveTo(x, y + 6);
      ctx.lineTo(x, y + h);
      ctx.ellipse(x + w / 2, y + h, w / 2, 6, 0, Math.PI, 0, true);
      ctx.lineTo(x + w, y + 6);
      ctx.stroke();
      break;
    }
    case 'server': {
      ctx.strokeRect(x, y + 2, 28, 18);
      ctx.beginPath();
      ctx.moveTo(x, y + 12);
      ctx.lineTo(x + 28, y + 12);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x + 22, y + 7, 1.8, 0, Math.PI * 2);
      ctx.arc(x + 22, y + 17, 1.8, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case 'cloud': {
      ctx.beginPath();
      ctx.arc(x + 10, y + 14, 7, Math.PI * 0.5, Math.PI * 1.5);
      ctx.arc(x + 16, y + 9, 6, Math.PI, Math.PI * 2);
      ctx.arc(x + 23, y + 14, 7, Math.PI * 1.5, Math.PI * 0.5);
      ctx.closePath();
      ctx.stroke();
      break;
    }
    case 'shield': {
      ctx.beginPath();
      ctx.moveTo(x + 14, y + 2);
      ctx.lineTo(x + 24, y + 8);
      ctx.lineTo(x + 14, y + 22);
      ctx.lineTo(x + 4, y + 8);
      ctx.closePath();
      ctx.stroke();
      break;
    }
    case 'clock': {
      ctx.beginPath();
      ctx.arc(x + 14, y + 12, 10, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x + 14, y + 12);
      ctx.lineTo(x + 14, y + 6);
      ctx.moveTo(x + 14, y + 12);
      ctx.lineTo(x + 20, y + 12);
      ctx.stroke();
      break;
    }
    case 'bolt': {
      ctx.beginPath();
      ctx.moveTo(x + 8, y + 4);
      ctx.lineTo(x + 18, y + 4);
      ctx.lineTo(x + 12, y + 16);
      ctx.lineTo(x + 20, y + 16);
      ctx.lineTo(x + 10, y + 28);
      ctx.lineTo(x + 14, y + 18);
      ctx.lineTo(x + 6, y + 18);
      ctx.closePath();
      ctx.stroke();
      break;
    }
    case 'flag': {
      ctx.beginPath();
      ctx.moveTo(x + 4, y + 2);
      ctx.lineTo(x + 4, y + 26);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x + 5, y + 4);
      ctx.lineTo(x + 22, y + 8);
      ctx.lineTo(x + 5, y + 12);
      ctx.closePath();
      ctx.stroke();
      break;
    }
    case 'bucket': {
      ctx.beginPath();
      ctx.moveTo(x + 4, y + 6);
      ctx.lineTo(x + 24, y + 6);
      ctx.lineTo(x + 20, y + 24);
      ctx.lineTo(x + 8, y + 24);
      ctx.closePath();
      ctx.stroke();
      break;
    }
    case 'monitor': {
      ctx.strokeRect(x + 2, y + 4, 24, 14);
      ctx.beginPath();
      ctx.moveTo(x + 12, y + 18);
      ctx.lineTo(x + 16, y + 22);
      ctx.lineTo(x + 8, y + 22);
      ctx.closePath();
      ctx.stroke();
      break;
    }
  }
  ctx.restore();
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r);
  ctx.lineTo(x + width, y + height - r);
  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  ctx.lineTo(x + r, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function drawBox(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  title: string,
  lines: string[],
  style: BoxStyle,
  icon?: string,
) {
  ctx.save();
  drawRoundedRect(ctx, x, y, w, h, 12);
  if (style.dashed) ctx.setLineDash([6, 6]);
  ctx.fillStyle = style.fill;
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = style.stroke;
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = style.text;
  ctx.font = "600 14px ui-sans-serif, system-ui, -apple-system, 'Noto Sans KR', sans-serif";
  ctx.textBaseline = 'top';
  const titleX = icon ? x + 46 : x + 12;
  if (icon) drawIcon(ctx, icon, x + 10, y + 6, style.stroke);
  ctx.fillText(title, titleX, y + 10);

  ctx.font = "12px ui-sans-serif, system-ui, -apple-system, 'Noto Sans KR', sans-serif";
  let textY = y + 34;
  for (const line of lines) {
    ctx.fillText(line, x + 12, textY);
    textY += 18;
  }

  ctx.restore();
}

function drawArrow(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color = '#94a3b8',
) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const headLen = 10;
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(
    x2 - headLen * Math.cos(angle - Math.PI / 6),
    y2 - headLen * Math.sin(angle - Math.PI / 6),
  );
  ctx.lineTo(
    x2 - headLen * Math.cos(angle + Math.PI / 6),
    y2 - headLen * Math.sin(angle + Math.PI / 6),
  );
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
}

function drawSectionTitle(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  color = '#cbd5e1',
) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.font = "700 12px ui-sans-serif, system-ui, -apple-system, 'Noto Sans KR', sans-serif";
  ctx.fillText(text, x, y);
  ctx.restore();
}

export function InfraCanvas() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let raf = 0;
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d')!;

    const render = () => {
      const parent = canvas.parentElement!;
      const cssWidth = Math.min(1200, parent.clientWidth);
      const cssHeight = 1400;
      const dpr = Math.max(1, Math.min(3, window.devicePixelRatio || 1));
      canvas.width = Math.floor(cssWidth * dpr);
      canvas.height = Math.floor(cssHeight * dpr);
      canvas.style.width = cssWidth + 'px';
      canvas.style.height = cssHeight + 'px';

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      ctx.clearRect(0, 0, cssWidth, cssHeight);
      ctx.save();
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, cssWidth, cssHeight);
      ctx.restore();

      const leftX = 40;
      const rightX = cssWidth - 420;
      const colW = 360;
      const boxH = 84;
      const vGap = 24;
      const yStart = 80;

      const styleLive: BoxStyle = { fill: '#f8fbff', stroke: '#2563eb', text: '#0f172a' };
      const styleInfra: BoxStyle = { fill: '#f8fafc', stroke: '#94a3b8', text: '#334155' };
      const stylePlanned: BoxStyle = {
        fill: '#fff7ed',
        stroke: '#f59e0b',
        text: '#7c2d12',
        dashed: true,
      };

      drawSectionTitle(ctx, 'Vercel', leftX, 20, '#93c5fd');
      drawSectionTitle(ctx, 'Supabase', rightX, 20, '#93c5fd');

      let y = yStart;
      drawBox(ctx, leftX, y, colW, boxH, '사용자 브라우저', ['HTTPS/TLS'], styleLive, 'monitor');
      y += boxH + vGap;
      drawBox(
        ctx,
        leftX,
        y,
        colW,
        boxH,
        'CDN (Edge Network)',
        ['Vercel Edge'],
        styleInfra,
        'cloud',
      );
      y += boxH + vGap;
      drawBox(
        ctx,
        leftX,
        y,
        colW,
        boxH,
        'Next.js 앱',
        ['RSC + Route Handlers', '런타임: Node 22.x', '리전: icn1'],
        styleLive,
        'server',
      );
      y += boxH + vGap;
      drawBox(
        ctx,
        leftX,
        y,
        colW,
        boxH,
        'API Routes',
        ['서버리스 함수', 'Prisma → Postgres'],
        styleLive,
        'server',
      );

      let yPlan = y + boxH + 10;
      drawBox(
        ctx,
        leftX,
        yPlan,
        colW,
        64,
        'Edge Middleware',
        ['라우트 기반'],
        stylePlanned,
        'flag',
      );
      yPlan += 64 + 10;
      drawBox(
        ctx,
        leftX,
        yPlan,
        colW,
        64,
        'Edge Functions',
        ['스트리밍/저지연'],
        stylePlanned,
        'bolt',
      );
      yPlan += 64 + 10;
      drawBox(ctx, leftX, yPlan, colW, 64, 'Vercel Cron', ['스케줄 작업'], stylePlanned, 'clock');
      yPlan += 64 + 10;
      drawBox(ctx, leftX, yPlan, colW, 64, 'Edge Config', ['기능 플래그'], stylePlanned, 'flag');

      const centerX = leftX + colW / 2;
      drawArrow(ctx, centerX, yStart + boxH, centerX, yStart + boxH + vGap - 6);
      drawArrow(
        ctx,
        centerX,
        yStart + (boxH + vGap) + boxH,
        centerX,
        yStart + (boxH + vGap) + boxH + vGap - 6,
      );
      drawArrow(
        ctx,
        centerX,
        yStart + 2 * (boxH + vGap) + boxH,
        centerX,
        yStart + 2 * (boxH + vGap) + boxH + vGap - 6,
      );

      y = yStart + (boxH + vGap) * 3;
      drawBox(
        ctx,
        rightX,
        y,
        colW,
        boxH,
        'Supabase API 게이트웨이',
        ['Auth · PostgREST · GraphQL'],
        styleLive,
        'server',
      );
      const apiCenterY = y + boxH / 2;
      drawArrow(ctx, leftX + colW, apiCenterY, rightX - 16, apiCenterY);

      y += boxH + vGap;
      drawBox(
        ctx,
        rightX,
        y,
        colW,
        128,
        'Postgres(관리형)',
        [
          '테이블: 10개',
          '행 수준 보안(RLS): 비활성',
          'Enums: Booking/Payment/Product',
          '확장: graphql, stat, crypto, uuid 등',
        ],
        styleInfra,
        'db',
      );

      yPlan = y + 128 + 10;
      drawBox(
        ctx,
        rightX,
        yPlan,
        colW,
        64,
        '인증(Auth)',
        ['사용자 0 · 이메일 OTP / OAuth'],
        stylePlanned,
        'shield',
      );
      yPlan += 64 + 10;
      drawBox(ctx, rightX, yPlan, colW, 64, 'Realtime', ['라이브 업데이트'], stylePlanned, 'bolt');
      yPlan += 64 + 10;
      drawBox(
        ctx,
        rightX,
        yPlan,
        colW,
        64,
        '스토리지 버킷',
        ['assets, uploads(공개/비공개)'],
        stylePlanned,
        'bucket',
      );
      yPlan += 64 + 10;
      drawBox(
        ctx,
        rightX,
        yPlan,
        colW,
        64,
        'Edge Functions',
        ['웹훅/스케줄'],
        stylePlanned,
        'bolt',
      );

      drawSectionTitle(ctx, '별칭(Alias)', leftX, cssHeight - 200);
      drawBox(
        ctx,
        leftX,
        cssHeight - 180,
        cssWidth - 80,
        140,
        '',
        [
          'kdoc.vercel.app (프로덕션)',
          'kdoc-k-docs-projects.vercel.app',
          'kdoc-git-main-k-docs-projects.vercel.app',
          'kdoc-git-develop-k-docs-projects.vercel.app',
        ],
        { fill: '#f8fafc', stroke: '#cbd5e1', text: '#334155' },
      );
    };

    const handle = () => (raf = window.requestAnimationFrame(render));
    handle();
    window.addEventListener('resize', handle);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', handle);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className='w-full rounded-2xl border border-slate-800 shadow-[0_10px_30px_rgba(0,0,0,0.25)]'
    />
  );
}
