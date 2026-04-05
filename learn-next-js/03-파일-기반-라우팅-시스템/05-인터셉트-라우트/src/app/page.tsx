import LinkCard from '@/components/ui/link-card'
import { LucideAreaChart, LucideBookOpenCheck, LucideGalleryThumbnails, LucideShoppingBag } from 'lucide-react'

export default function MainPage() {
  return (
    <div className="w-full py-12">
      <section className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
        
        <LinkCard
          href="/gallery"
          title="갤러리"
          icon={LucideGalleryThumbnails}
          description={
            <>
              Next.js의 인터셉트 라우트
              <br />
              개념을 학습힙니다.
            </>
          }
          actionLabel="갤러리 모달 보기"
        />

        <LinkCard
          href="/docs/%EA%B8%B0%EC%B4%88"
          title="학습 문서"
          color="rose"
          icon={LucideBookOpenCheck}
          description={
            <>
              Next.js의 라우팅 원리와
              <br />
              기초 개념을 차근차근 익혀보세요.
            </>
          }
          actionLabel="가이드 읽어보기"
        />
        
        <LinkCard
          href="/shop"
          title="쇼핑"
          icon={LucideShoppingBag}
          color="emerald"
          description={
            <>
              복잡한 카테고리 구조를 가진
              <br />
              스토어 예제를 직접 확인해보세요.
            </>
          }
          actionLabel="스토어 입장하기"
        />
        
        <LinkCard
          href="/dashboard"
          title="대시보드"
          color="amber"
          icon={LucideAreaChart}
          description={
            <>
              Next.js의 패러럴 라우트
              <br />
              개념을 학습힙니다.
            </>
          }
          actionLabel="대시보드 보기"
        />

      </section>
    </div>
  )
}
