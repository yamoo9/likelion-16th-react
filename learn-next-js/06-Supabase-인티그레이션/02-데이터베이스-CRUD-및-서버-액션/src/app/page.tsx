import { LucideDatabase, LucideSettings2 } from 'lucide-react'
import LinkCard from '@/components/ui/link-card'
import { cn } from '@/utils'

export default function SupabaseSetupPage() {
  return (
    <div className="w-full py-12">
      <section
        className={cn(
          'grid grid-cols-1 gap-8 md:grid-cols-2',
          'mx-auto w-full max-w-4xl p-6 md:p-0'
        )}
      >
        {/* 환경 설정 및 연결 테스트 */}
        <LinkCard
          href="/setup-check"
          title="환경 설정 및 연결 확인"
          actionLabel="연결 상태 테스트"
          description="Supabase 프로젝트의 API 키를 설정하고, 클라이언트 객체가 정상적으로 생성되어 통신되는지 확인합니다."
          icon={LucideSettings2}
        />

        {/* 데이터베이스 CRUD 및 서버 액션 */}
        <LinkCard
          color="emerald"
          href="/memos-crud"
          title="데이터베이스 CRUD"
          actionLabel="메모 관리 시작하기"
          description="서버 액션을 활용하여 DB 테이블의 데이터를 생성, 조회, 수정, 삭제하는 기능을 구현합니다."
          icon={LucideDatabase}
        />
      </section>
    </div>
  )
}