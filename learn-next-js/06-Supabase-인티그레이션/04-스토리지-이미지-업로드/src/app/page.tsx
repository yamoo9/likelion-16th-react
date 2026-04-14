import { LucideShieldCheck, LucideUserCircle } from 'lucide-react'

import LinkCard from '@/components/ui/link-card'
import { cn } from '@/utils'

export default function SupabaseSetupPage() {
  return (
    <div className="w-full space-y-12 py-12">
      <section
        className={cn(
          'grid gap-8 md:grid-cols-2',
          'mx-auto w-full max-w-4xl p-6 md:p-0',
        )}
      >
        <LinkCard
          href="/auth-basic"
          title="소셜 로그인 연동"
          actionLabel="로그인 테스트"
          description="파일 업로드를 진행하려면 먼저 인증해야 합니다."
          icon={LucideShieldCheck}
        />

        <LinkCard
          href="/upload-profile-image"
          title="프로필 이미지 업로드"
          actionLabel="파일 업로드 테스트"
          description="Storage 버킷에 이미지를 업로드하고, 공개 URL 생성 및 이미지 최적화 기능을 실습합니다."
          icon={LucideUserCircle}
        />
      </section>
    </div>
  )
}
