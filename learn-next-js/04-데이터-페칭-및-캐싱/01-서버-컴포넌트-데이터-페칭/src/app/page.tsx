import { LucideMousePointer2, LucideServer } from 'lucide-react'

import LinkCard from '@/components/ui/link-card'
import { cn } from '@/utils'

/**
 * [Next.js 데이터 페칭 및 렌더링]
 * 
 * 클라이언트 컴포넌트 (CSR)
 * - 브라우저 상호작용(onClick, useState 등)이 필요할 때 사용.
 * - 참고: https://nextjs.org/docs/app/building-your-application/rendering/client-components
 * 
 * 서버 컴포넌트 (SSR/RSC)
 * - 서버에서 직접 데이터 조회, 보안 및 성능 최적화에 유리.
 * - 참고: https://nextjs.org/docs/app/building-your-application/rendering/server-components
 * 
 * 데이터 페칭 전략
 * - 참고: https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating
 */

export default function MainPage() {
  return (
    <div className="w-full py-12">
      <section
        className={cn(
          'grid grid-cols-1 gap-8 md:grid-cols-2',
          'mx-auto w-full max-w-4xl p-6 md:p-0',
        )}
      >
        <LinkCard
          href="/client-side"
          title="클라이언트 사이드 (CSR)"
          actionLabel="클라이언트 측 데이터 페칭"
          description={''}
          icon={LucideMousePointer2}
        />
        <LinkCard
          color="emerald"
          href="/client-side"
          title="서버 사이드 (SSR)"
          actionLabel="서버 측 데이터 페칭"
          description={''}
          icon={LucideServer}
        />
      </section>
    </div>
  )
}
