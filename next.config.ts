import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 개발 환경에서 최대한 자세한 로깅 활성화
  logging: {
    // fetch 요청 로깅 설정
    fetches: {
      fullUrl: true, // 전체 URL 로깅
      hmrRefreshes: true, // HMR 캐시에서 복원된 fetch도 로깅
    },
    // 들어오는 요청 로깅 (개발 환경에서만)
    incomingRequests: true, // 모든 요청 로깅
  },

  // 프로덕션에서도 소스맵 생성 (디버깅용)
  productionBrowserSourceMaps: true,

  // React Strict Mode 활성화 (개발 시 더 많은 경고)
  reactStrictMode: true,

  // 실험적 기능들 (더 자세한 로깅을 위해)
  experimental: {
    // 서버 컴포넌트 HMR 캐시 활성화
    serverComponentsHmrCache: true,
  },
};

export default nextConfig;
