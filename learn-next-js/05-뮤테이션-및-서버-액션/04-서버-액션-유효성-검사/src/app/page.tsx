import { LucideShieldCheck, LucideShieldHalf } from 'lucide-react'

import LinkCard from '@/components/ui/link-card'
import { cn } from '@/utils'

export default function MainPage() {
  return (
    <div className="w-full py-12 px-6 lg:px-0">
      <section
        className={cn(
          'grid grid-cols-1 gap-6 md:grid-cols-2',
          'mx-auto w-full max-w-4xl p-6 md:p-0'
        )}
      >
        <LinkCard
          icon={LucideShieldHalf}
          href="/zod-guide"
          title="Zod 시작하기"
          actionLabel="기초 학습 GO"
          description="TypeScript-first 스키마 선언 및 타입 추론, 런타임 검증까지 Zod의 기본 사용법을 마스터합니다."
        />
        <LinkCard
          icon={LucideShieldCheck}
          href="/validate-server-action"
          title="서버 액션 벨리데이션"
          actionLabel="유효성 검사 GO"
          description="Zod 라이브러리를 사용하여 서버 액션 입력값을 안전하고 직관적으로 검증하는 실전 전략을 학습합니다."
        />
      </section>
    </div>
  )
}