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
        {/* 
          [환경 설정]
          - Supabase 계정 및 프로젝트 생성
          - `.env.*` 파일에 url, key 추가
          - Supabase URL/KEY 설정 및 createClient (서버/클라이언트 측) 유틸리티 작성
        */}
        <LinkCard
          href="/setup-check"
          title="환경 설정 및 연결 확인"
          actionLabel="연결 상태 테스트"
          description="Supabase 프로젝트의 API 키를 설정하고, 클라이언트 객체가 정상적으로 생성되어 통신되는지 확인합니다."
          icon={LucideSettings2}
        />

        {/* 
          [데이터베이스 테이블 데이터 조회]
          - memos 데이터베이스 생성 (인터페이스 확인)
          - 서버 컴포넌트에서 Supabase 테이블 데이터 가져오기
          - memos.csv를 사용해 데이터 일괄 업로드
        */}
        <LinkCard
          color="emerald"
          href="/read-table-data"
          title="테이블 데이터 조회"
          actionLabel="첫 데이터 불러오기"
          description="Supabase 대시보드에서 생성한 테이블의 데이터를 서버 컴포넌트에서 직접 조회하여 화면에 출력합니다."
          icon={LucideDatabase}
        />
      </section>
    </div>
  )
}