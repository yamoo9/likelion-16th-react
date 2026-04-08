import { LucideShieldCheck } from 'lucide-react'

import LinkCard from '@/components/ui/link-card'
import { cn } from '@/utils'

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
          icon={LucideShieldCheck}
          href="/validate-server-action"
          title="서버 액션 유효성 검사"
          actionLabel="유효성 검사 GO"
          description={
            <>
              Zod 라이브러리를 사용하여 서버 액션의 입력값을 안전하고 직관적으로 검증하는 방법을 학습합니다.
            </>
          }
        />
      </section>
    </div>
  )
}