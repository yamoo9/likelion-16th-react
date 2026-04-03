import { LucideBookOpen } from 'lucide-react'
import LinkCard from '@/components/ui/link-card'
import PageSectionTitle from '@/components/ui/page-section-title'

export default function CategoriesPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8 py-12">
      <PageSectionTitle
        title="북 카테고리"
        description="관심있는 분야를 발견하고 새로운 영감을 발견하세요."
      />
      <LinkCard
        href="/categories/novel"
        title="소설"
        description="상상력을 자극하는 흥미진진한 이야기, 국내외 최신 소설 모음입니다."
        icon={LucideBookOpen}
      />
    </div>
  )
}
