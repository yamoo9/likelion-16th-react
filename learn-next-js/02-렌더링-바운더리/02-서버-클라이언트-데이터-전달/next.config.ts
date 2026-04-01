import type { NextConfig } from 'next'

const isProduction = process.env.NODE_ENV === 'production'

const nextConfig: NextConfig = {
  // 더 나은 개발 경험을 위해 React 엄격 모드 활성화
  reactStrictMode: true,

  // 컴파일러 옵션 구성
  compiler: {
    // 프로덕션에서 콘솔 로그 제거 (개발 중에는 유지)
    removeConsole: isProduction ? { exclude: ['error', 'warn'] } : false,
  },
}

export default nextConfig
