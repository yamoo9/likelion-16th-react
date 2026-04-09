import { 
  LucideDatabase, 
  LucideUserCircle2, 
  LucideShieldCheck, 
  LucideSettings2
} from 'lucide-react'

import LinkCard from '@/components/ui/link-card'
import { cn } from '@/utils'

/**
 * [인증(Auth) vs 인가(RLS)]
 * --------------------------------------------------------------------------
 * 인증 (Authentication): "신원 확인"
 * - 사용자가 누구인지 증명하는 과정 (ID/PW 로그인)
 * - 서버와 브라우저 사이에 '세션(쿠키)'이 생성됨
 * 
 * 인가 (Authorization / RLS): "권한 제어"
 * - 인증된 사용자가 특정 데이터에 접근할 자격이 있는지 DB 레벨에서 검사
 * - PostgreSQL의 RLS(Row Level Security) 정책 활용
 * --------------------------------------------------------------------------
 */

export default function SupabaseSetupPage() {
  return (
    <div className="w-full py-12 space-y-12">
      <section
        className={cn(
          'grid gap-8 md:grid-cols-2',
          'mx-auto w-full max-w-4xl p-6 md:p-0'
        )}
      >

        <LinkCard
          href="/setup-check"
          title="환경 설정 및 연결 확인"
          actionLabel="연결 상태 테스트"
          description="Supabase 프로젝트를 설정하고, 클라이언트 객체가 정상적으로 생성되어 통신되는지 확인합니다."
          icon={LucideSettings2}
        />

        <LinkCard
          color="emerald"
          href="/memos-crud"
          title="공용 데이터 조회 (No RLS)"
          actionLabel="전체 데이터 확인"
          description="RLS가 꺼진 상태에서 모든 사용자의 데이터가 무분별하게 노출되는 보안 취약점을 직접 확인합니다."
          icon={LucideDatabase}
        />

        <LinkCard
          color="amber"
          href="/auth-basic"
          title="인증 (Auth)"
          actionLabel="가입 및 로그인 시스템 구현"
          description="회원가입과 로그인을 통해 사용자의 세션을 생성하고, 서버 컴포넌트에서 유저 정보를 식별합니다."
          icon={LucideUserCircle2}
        />

        <LinkCard
          color="rose"
          href="/rls-secure"
          title="보안 정책 및 RLS"
          actionLabel="데이터 보호 적용"
          description="auth.uid() 함수를 사용하여 로그인한 본인의 데이터만 조회/수정할 수 있는 철통 보안을 완성합니다."
          icon={LucideShieldCheck}
        />
      </section>

    </div>
  )
}