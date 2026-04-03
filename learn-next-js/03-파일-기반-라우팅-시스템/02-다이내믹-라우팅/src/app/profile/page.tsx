import LinkCard from '@/components/ui/link-card'
import PageSectionTitle from '@/components/ui/page-section-title'
import { LucideSettings2 } from 'lucide-react'

export default function BooksPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8 py-12">
      <PageSectionTitle
        title="프로필"
        description="당신의 취향이 머문 기록들을 한곳에서 확인하세요."
      />
      <LinkCard
        href="/profile/settings"
        title="설정"
        description="회원 정보 수정 및 알림 설정 등 내 계정의 상세 옵션을 관리합니다."
        icon={LucideSettings2}
      />
    </div>
  )
}
