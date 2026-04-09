import LinkCard from '@/components/ui/link-card'
import { cn } from '@/utils'
import { LucideMousePointer2, LucideMousePointerClick, LucideZap } from 'lucide-react'

/**
 * [Next.js 데이터 페칭 전략]
 * 
 * 클라이언트 사이드 (CSR) 
 * - 브라우저 마운트 후 'useEffect'나 'useSWR/React Query'로 데이터 호출
 * - SEO에 불리할 수 있으나, 실시간 상호작용이 많은 대시보드 등에 적합
 * 
 * 스트리밍 & 서스펜스 (Streaming)
 * - 서버에서 데이터를 가져오되, 완료된 부분부터 브라우저에 즉시 전송(Chunk)
 * - 'Suspense'를 사용하여 특정 컴포넌트만 로딩 상태(Skeleton)로 관리 가능
 * - 참고: https://nextjs.org/docs/app/getting-started/fetching-data
 * 
 * 로딩 UI 전략
 * - 'loading.tsx': 페이지 전체 경로 이동 시 즉각적인 피드백 (전체 레이아웃)
 * - '<Suspense>': 페이지 내부의 특정 섹션별 독립적인 로딩 제어 (부분 로딩)
 */

export default function MainPage() {
  return (
    <div className="w-full py-12">
      <section
        className={cn(
          'grid grid-cols-1 gap-8 md:grid-cols-2',
          'mx-auto w-full max-w-4xl p-6 md:p-0',
        )}
      >
        {/* 
          클라이언트 사이드 페칭 
          - 특징: 사용자가 페이지 진입 후 로딩 스피너/스켈레톤을 보게 됨
          - 구현: 'use client', useState, useEffect 활용
        */}
        <LinkCard
          href="/client-side"
          title="클라이언트 사이드 (CSR)"
          actionLabel="클라이언트 측 데이터 페칭"
          description="브라우저에서 직접 데이터를 요청하고 상태를 관리하는 전통적인 React의 방식입니다."
          icon={LucideMousePointer2}
        />

        <LinkCard
          color="rose"
          href="/partial-rendering"
          title="클라이언트 사이드 PR"
          actionLabel="클라이언트 측 부분 렌더링"
          description="클라이언트 측 데이터 페칭 방식으로 부분 렌더링 : 로딩, 에러 UI 제공"
          icon={LucideMousePointerClick}
        />

        {/* 
          스트리밍 & 서스펜스 
          - 특징: 서버 컴포넌트에서 Promise를 생성하고, Suspense로 감싸 부분적 로딩 구현
          - 구현: async/await(서버), use(Promise)(클라이언트), <Suspense> 활용
        */}
        <LinkCard
          color="emerald"
          href="/server-side"
          title="서버 사이드 (SSR)"
          actionLabel="서버 측 데이터 페칭 (스트리밍)"
          description="서버에서 준비되는 데이터부터 즉시 화면에 그려주는 Next.js의 최신 렌더링 방식입니다."
          icon={LucideZap}
        />

        <LinkCard
          color="amber"
          href="/server-streaming"
          title="서버 스트리밍 (Streaming)"
          actionLabel="서버 측 데이터 페칭 (스트리밍)"
          description="서버에서 준비되는 데이터부터 즉시 화면에 그려주는 Next.js의 최신 렌더링 방식입니다."
          icon={LucideZap}
        />
      </section>
    </div>
  )
}