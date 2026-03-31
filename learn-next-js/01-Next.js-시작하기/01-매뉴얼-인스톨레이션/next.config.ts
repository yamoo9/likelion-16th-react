import type { NextConfig } from "next"

// 빌드(프로덕션: 배포)할 것인지 여부 확인 변수
const isProduction = process.env.NODE_ENV === 'production'

const nextConfig: NextConfig = {
  // 더 나은 개발 경험을 위해 React 엄격 모드 활성화
  reactStrictMode: true,

  // 컴파일러 옵션 설정
  compiler: {
    removeConsole: isProduction ? { exclude: ['warn', 'error'] } : false
  }
}

export default nextConfig