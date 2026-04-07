import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'

import '@/styles/globals.css'
import { cn } from '@/utils'
import { Navbar } from '@/components/ui/navbar'
import Footer from '@/components/ui/footer'

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  variable: '--font-noto',
})

export const metadata: Metadata = {
  title: 'Next.js 러닝 가이드',
  description: '현대적인 웹 경험을 위한 Next.js 프레임워크 학습 플랫폼',
}

/*
  -----------------------------------------------------------------------------------
  Next.js App Router 병렬 라우트 (Parallel Routes)
  -----------------------------------------------------------------------------------
  - 문제점: 대시보드처럼 한 화면에 여러 독립적인 섹션(분석, 팀 관리 등)이 있을 때, 
           기존 방식으로는 하나의 `page.tsx`가 너무 비대해지거나 관리가 어려움.
  - 해결책: 슬롯(@folder)을 사용하여 동일한 레이아웃 내에서 여러 페이지를 
           동시에 또는 조건부로 렌더링 (독립적인 로딩/에러 처리 가능).
  -----------------------------------------------------------------------------------

  app/dashboard/
  ├── layout.tsx              # [Dashboard Layout] @analytics, @team을 props로 받아 배치
  ├── page.tsx                # [/dashboard] 메인 콘텐츠 (중앙 섹션)
  │
  ├── @analytics/             # [분석 슬롯] URL에 영향을 주지 않는 가상 폴더
  │   ├── page.tsx            # 분석 섹션의 실제 콘텐츠
  │   └── default.tsx         # 새로고침 시 경로 불일치 대응을 위한 폴백
  │
  └── @team/                  # [팀 관리 슬롯] 독립적인 상태를 가진 섹션
      ├── page.tsx            # 팀 멤버 목록 콘텐츠
      └── default.tsx         # 새로고침 시 경로 불일치 대응을 위한 폴백
  
  -----------------------------------------------------------------------------------
  실습 목표: 복잡한 대시보드 UI를 슬롯 단위로 분리하여 구현하기!
  참고: https://nextjs.org/docs/app/api-reference/file-conventions/parallel-routes
  -----------------------------------------------------------------------------------
  1. @analytics, @team 폴더를 생성하여 각각의 독립된 UI 작성.
  2. dashboard/layout.tsx에서 `{analytics, team, children}` props 추출.
  3. Tailwind CSS와 cn 함수를 활용하여 어반립(Urban-Lip) 스타일의 카드 레이아웃 완성.
  4. 각 슬롯에 default.tsx를 작성하여 하드 내비게이션(새로고침) 시 404 에러 방지.
  -----------------------------------------------------------------------------------
*/


export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="ko-KR">
      <body
        className={cn(
          notoSansKR.variable,
          'min-h-screen overflow-y-scroll', 
          'flex flex-col bg-white font-sans text-slate-900 antialiased',
        )}
      >
        <Navbar />
        <main className="mx-auto flex w-full grow max-w-5xl flex-col px-6 py-8 lg:py-12">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
