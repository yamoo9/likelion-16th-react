import PageSectionTitle from '@/components/ui/page-section-title'

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8 py-12">
      <PageSectionTitle  
        title="설정"
        description="회원 정보 수정 및 알림 설정 등 내 계정의 상세 옵션을 관리합니다."
      />
    </div>
  )
}
