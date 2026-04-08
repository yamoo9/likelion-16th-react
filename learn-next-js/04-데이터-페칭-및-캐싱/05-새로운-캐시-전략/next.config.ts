import type { NextConfig } from 'next'

/**
 * 환경 변수를 통해 현재 실행 환경이 프로덕션(배포) 상태인지 확인합니다.
 */
const isProduction = process.env.NODE_ENV === 'production'

const nextConfig: NextConfig = {
  /**
   * Next.js 새로운 캐시 시스템 활성화
   * - 'use cache' 지시어 사용 가능
   * - cacheLife()를 통한 정교한 수명 제어 가능
   * - cacheTag()를 통한 태그 기반 무효화 가능
   */

  /**
   * React 엄격 모드 (Strict Mode) 활성화
   * - 잠재적인 문제를 조기에 발견하기 위해 생명주기 메서드 등을 이중으로 호출합니다.
   * - 개발 환경에서 렌더링 최적화 및 안전한 코드 작성을 돕습니다.
   */
  reactStrictMode: true,

  /**
   * SWC 컴파일러 옵션 설정
   */
  compiler: {
    /**
     * 콘솔 로그 제거 설정
     * - 배포 환경(isProduction)에서는 보안 및 성능을 위해 console.log를 삭제합니다.
     * - 단, 서비스 운영에 필요한 'error'와 'warn' 로그는 제외(exclude)하여 추적이 가능하게 합니다.
     */
    removeConsole: isProduction ? { exclude: ['error', 'warn'] } : false,
  },

  /**
   * 이미지 최적화 설정
   */
  images: {
    /**
     * 외부 이미지 허용 패턴 (Remote Patterns)
     * - Next.js의 Image 컴포넌트에서 외부 호스트의 이미지를 불러올 때 보안을 위해 명시적으로 허용해야 합니다.
     * - 네이버 쇼핑 이미지 서버(shopping-phinf.pstatic.net)를 안전하게 허용합니다.
     */
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'shopping-phinf.pstatic.net',
        // 모든 하위 경로(/**)의 이미지를 허용합니다.
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig