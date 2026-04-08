import { LucideMousePointer2, LucideZap } from 'lucide-react'
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
        {/* 
          useActionState를 활용한 폼 처리
          - 특징: 서버 액션의 결과(결과 데이터, 에러)를 훅을 통해 직접 수신
          - UI 피드백: 'isPending' 상태를 활용해 버튼 비활성화 및 로딩 스피너 표시 가능
        */}
        <LinkCard
          href="/client-side"
          title="useActionState 활용"
          actionLabel="클라이언트 폼 상태 관리"
          description="useActionState 훅을 사용하여 서버 액션의 결과와 로딩 상태를 효율적으로 관리하는 방법을 학습합니다."
          icon={LucideMousePointer2}
        />

        {/* 
          전통적인 서버 사이드 방식과의 비교
          - 서버 컴포넌트 환경에서의 URL(searchParams)에 의존하는 무상태(Stateless) 방식
        */}
        <LinkCard
          color="emerald"
          href="/server-side"
          title="전통적 서버 방식"
          actionLabel="URL 기반 상태 전달"
          description="훅을 사용하지 않고 리디렉션과 쿼리 파라미터만을 이용해 에러를 처리하는 고전적인 방식을 비교 학습합니다."
          icon={LucideZap}
        />
      </section>
    </div>
  )
}
