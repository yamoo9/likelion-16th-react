'use client'

import LinkCard from '@/components/ui/link-card'
import { cn } from '@/utils'
import { LucideZap } from 'lucide-react'

export default function MainPage() {
  return (
    <div className="w-full py-12">
      <section
        className={cn(
          'grid grid-cols-1 gap-8 md:grid-cols-2',
          'mx-auto w-full max-w-4xl p-6 md:p-0'
        )}
      >
        <LinkCard
          icon={LucideZap}
          href="/optimistic-update"
          title="낙관적인 UI 업데이트"
          actionLabel="useOptimistic 훅 활용"
          description={
            <>
              서버 응답 전 <abbr>UI</abbr>를 즉시 업데이트하여 사용자 경험을 극대화합니다.
              실패 시에는 자동 롤백됩니다.
            </>
          }
        />
      </section>

    </div>
  )
}