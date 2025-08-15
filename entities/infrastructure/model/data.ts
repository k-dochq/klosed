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
  Code2,
  Link2,
} from 'lucide-react';
import { InfraLane, AliasLink } from './types';

export const infraLanes: InfraLane[] = [
  {
    id: 'client',
    title: 'Client',
    services: [
      {
        id: 'browser',
        name: '사용자 브라우저',
        icon: Monitor,
        subtitle: 'HTTPS/TLS',
        status: 'current',
      },
    ],
  },
  {
    id: 'vercel',
    title: 'Vercel',
    services: [
      {
        id: 'cdn',
        name: 'CDN (Edge Network)',
        icon: Cloud,
        subtitle: 'Vercel Edge',
        status: 'current',
      },
      {
        id: 'nextjs',
        name: 'Next.js 앱',
        icon: Server,
        subtitle: '',
        features: ['RSC + Route Handlers', '런타임: Node 22.x', '리전: icn1'],
        status: 'current',
      },
      {
        id: 'api-routes',
        name: 'API Routes',
        icon: Server,
        subtitle: '',
        features: ['서버리스 함수', 'JWT/SDK/REST/GraphQL → Supabase', 'Prisma → Postgres'],
        status: 'current',
      },
      {
        id: 'edge-middleware',
        name: 'Edge Middleware',
        icon: Flag,
        subtitle: '라우트 기반',
        status: 'planned',
      },
      {
        id: 'edge-functions',
        name: 'Edge Functions',
        icon: Bolt,
        subtitle: '스트리밍/저지연',
        status: 'planned',
      },
      {
        id: 'vercel-cron',
        name: 'Vercel Cron',
        icon: Clock,
        subtitle: '스케줄 작업',
        status: 'planned',
      },
      {
        id: 'edge-config',
        name: 'Edge Config',
        icon: Settings,
        subtitle: '기능 플래그',
        status: 'planned',
      },
    ],
  },
  {
    id: 'supabase',
    title: 'Supabase',
    services: [
      {
        id: 'api-gateway',
        name: 'API 게이트웨이',
        icon: Server,
        subtitle: 'Auth · PostgREST · GraphQL',
        status: 'current',
      },
      {
        id: 'postgres',
        name: 'Postgres (관리형)',
        icon: Database,
        subtitle: '',
        features: [
          '테이블: 10개, RLS: 비활성',
          'Enums: Booking/Payment/Product',
          '확장: graphql/stat/crypto/uuid',
        ],
        status: 'current',
      },
      {
        id: 'auth',
        name: '인증(Auth)',
        icon: Shield,
        subtitle: '이메일 OTP · OAuth(구글/깃허브/애플)',
        status: 'planned',
      },
      {
        id: 'realtime',
        name: 'Realtime',
        icon: Activity,
        subtitle: '라이브 업데이트',
        status: 'planned',
      },
      {
        id: 'storage',
        name: '스토리지 버킷',
        icon: Upload,
        subtitle: 'assets, uploads (공개/비공개)',
        status: 'planned',
      },
      {
        id: 'supabase-edge-functions',
        name: 'Edge Functions',
        icon: Bolt,
        subtitle: '웹훅/스케줄',
        status: 'planned',
      },
    ],
  },
];

export const aliasLinks: AliasLink[] = [
  {
    id: 'production',
    url: 'kdoc.vercel.app',
    description: '프로덕션',
  },
  {
    id: 'preview-main',
    url: 'kdoc-k-docs-projects.vercel.app',
  },
  {
    id: 'git-main',
    url: 'kdoc-git-main-k-docs-projects.vercel.app',
  },
  {
    id: 'git-develop',
    url: 'kdoc-git-develop-k-docs-projects.vercel.app',
  },
];
