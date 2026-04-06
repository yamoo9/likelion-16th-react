import { LucideGlobe, LucideTimer, LucideZap } from 'lucide-react'

import LinkCard from '@/components/ui/link-card'
import { cn } from '@/utils'

/**
 * [Next.js 16 렌더링 전략 및 재검증]
 * 
 * 정적 렌더링 (Static Rendering) — 기본
 * - 특징: 빌드 시점에 딱 한 번 생성
 * - 장점: 속도가 가장 빠름 (CDN 캐싱)
 * - 용도: 변하지 않는 소개 페이지, 블로그 포스트 등
 * - 설정: export const dynamic = 'force-static'
 * - 참고: https://nextjs.org/docs/app/guides/caching-without-cache-components#route-segment-config
 * 
 * 동적 렌더링 (Dynamic Rendering)
 * - 특징: 요청이 올 때마다 서버에서 새로 생성
 * - 장점: 항상 최신 데이터, 개인화된 정보(로그인 등) 제공 가능
 * - 용도: 마이페이지, 실시간 대시보드 등
 * - 설정: export const dynamic = 'force-dynamic'
 * - 참고: https://nextjs.org/docs/app/guides/caching-without-cache-components#dynamic
 * 
 * 시간 기반 재검증 설정 (Time-based Revalidation / ISR)
 * - 특징: 정적 페이지를 유지하되, 설정한 주기(예: 60초)마다 백그라운드에서 갱신
 * - 장점: 정적의 속도 + 동적의 최신성을 절충
 * - 용도: 뉴스 목록, 인기 게시글 등 데이터가 자주 바뀌지만 실시간일 필요는 없는 경우
 * - 설정: export const revalidate = 60 // 60초마다 갱신
 * - 참고: https://nextjs.org/docs/app/guides/caching-without-cache-components#route-segment-config-revalidate
 */

export default function MainPage() {
  return (
    <div className="w-full py-12">
      <section
        className={cn(
          'grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3',
          'mx-auto w-full max-w-6xl p-6 md:p-0',
        )}
      >
        {/* 정적 렌더링 (Static) */}
        <LinkCard
          href="/static-rendering"
          title="정적 렌더링"
          actionLabel="빌드 시점 생성"
          description="빌드 시 미리 렌더링되어 HTML이 캐싱됩니다. 가장 빠르고 효율적인 방식입니다."
          icon={LucideGlobe}
        />

        {/* 동적 렌더링 (Dynamic) */}
        <LinkCard
          color="emerald"
          href="/dynamic-rendering"
          title="동적 렌더링"
          actionLabel="요청 시점 생성"
          description="접속할 때마다 서버에서 새롭게 렌더링합니다. 실시간 데이터나 사용자 맞춤형 정보에 적합합니다."
          icon={LucideZap}
        />

        {/* 시간 기반 재검증 (ISR) */}
        <LinkCard
          color="amber"
          href="/time-based-revalidation"
          title="시간 기반 재검증"
          actionLabel="주기적 자동 갱신"
          description="정적 페이지의 장점을 유지하면서, 설정한 시간마다 데이터를 최신으로 업데이트합니다."
          icon={LucideTimer}
        />
      </section>
    </div>
  )
}