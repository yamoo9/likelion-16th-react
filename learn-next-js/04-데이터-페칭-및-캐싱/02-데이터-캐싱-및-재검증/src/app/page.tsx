import { LucideTags, LucideTimer, LucideZap } from 'lucide-react'
import LinkCard from '@/components/ui/link-card'
import { cn } from '@/utils'

/**
 * [Next.js 16 데이터 캐싱 및 재검증 전략]
 * 
 * 캐시하고 싶을 때 (Static Data)
 * - Next.js 15/16은 기본이 no-store이므로 명시적 설정 권장
 * - fetch(url, { cache: 'force-cache' })
 * - 참고: https://nextjs.org/docs/app/guides/caching-without-cache-components#caching-fetch-requests
 * 
 * 시간 기반 재검증 (ISR)
 * - 설정한 시간(초)마다 백그라운드에서 캐시 갱신 시도
 * - fetch(url, { next: { revalidate: 60 } })
 * - 참고: https://nextjs.org/docs/app/guides/caching-without-cache-components#time-based-revalidation
 * 
 * 주문형(On-demand) 재검증 (Tag 기반)
 * - 특정 태그를 부여하고 필요할 때만 갱신
 * - fetch(url, { next: { tags: ['pokemon-list'] } })
 * - 갱신 시: revalidateTag('pokemon-list')
 * - 참고: https://nextjs.org/docs/app/guides/caching-without-cache-components#on-demand-revalidation
 * 
 * 경로 기반 재검증 (Path 기반)
 * - 특정 페이지의 모든 캐시를 한꺼번에 갱신
 * - revalidatePath('/pokemon')
 * - 참고: https://nextjs.org/docs/app/guides/caching-without-cache-components#revalidatepath
 * 
 * 시간 기반 + 주문형 혼합 (Hybrid)
 * - 주기적으로 갱신하되, 중요한 변경 시 즉시 수동 갱신 가능
 * - fetch(url, { next: { revalidate: 3600, tags: ['posts'] } })
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
        {/* 시간 기반 재검증 섹션 */}
        <LinkCard
          href="/time-based-revalidation"
          title="시간 기반 재검증"
          actionLabel="ISR 방식 확인"
          description="60초마다 자동으로 데이터가 갱신되는 정적 페이지 생성 전략입니다."
          icon={LucideTimer}
        />

        {/* 태그 기반 재검증 섹션 */}
        <LinkCard
          color="emerald"
          href="/tag-based-revalidation"
          title="태그 기반 재검증"
          actionLabel="On-demand 방식 확인"
          description="특정 태그를 지정하여 원할 때만 즉시 데이터를 갱신하는 전략입니다."
          icon={LucideTags}
        />

        {/* 혼합 재검증 섹션 (추가 제안) */}
        <LinkCard
          color="amber"
          href="/hybrid-revalidation"
          title="하이브리드 재검증"
          actionLabel="Mixed 방식 확인"
          description="시간 기반 갱신과 수동 갱신을 결합하여 효율성을 극대화한 전략입니다."
          icon={LucideZap}
        />
      </section>
    </div>
  )
}