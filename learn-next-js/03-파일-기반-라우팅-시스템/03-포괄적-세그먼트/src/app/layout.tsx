import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'

import { cn } from '@/utils'
import { Navbar } from '@/components/ui/navbar'
import Footer from '@/components/ui/footer'
import '@/styles/globals.css'

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  variable: '--font-noto',
})

export const metadata: Metadata = {
  title: 'Next.js 러닝 가이드',
  description: '현대적인 웹 경험을 위한 Next.js 프레임워크 학습 플랫폼',
}

/*
  -------------------------------------------------------------------------------------------------
  Next.js App Router 포괄적 세그먼트 (Catch-all Segments)
  -------------------------------------------------------------------------------------------------
  - 문제점: 새로운 주제나 카테고리가 생길 때마다 매번 폴더와 `page.tsx`를 만들어야 함.
  - 해결책: 포괄적 세그먼트(`[...slug]`)를 사용하여 하나의 파일로 모든 경로를 처리.
  -------------------------------------------------------------------------------------------------

  app/ 
  ├── layout.tsx               # [Root Layout] 전체 공통 레이아웃
  ├── page.tsx                 # [/] 메인 페이지 (Docs, Shop 바로가기 카드)
  │
  ├── docs/                    # [학습 문서 섹션]
  │   └── 기초/             
  │       ├── page.tsx         # [/docs/기초] 전용 페이지
  │       └── 라우팅-기초/    
  │           ├── page.tsx     # [/docs/기초/라우팅-기초] 전용 페이지
  │           └── 중첩-레이아웃/
  │               └── page.tsx # [/docs/기초/라우팅-기초/중첩-레이아웃] 전용 페이지
  │
  └── shop/                    # [쇼핑몰 섹션]
      ├── page.tsx             # [/shop] 스토어 메인
      └── 전자제품/          
          ├── page.tsx         # [/shop/전자제품] 카테고리 페이지
          └── 스마트폰/    
              └── page.tsx     # [/shop/전자제품/스마트폰] 상품 리스트 페이지
  
  -------------------------------------------------------------------------------------------------
  실습 목표: 위 구조를 아래와 같이 단 2개의 파일로 통합하기!
  참고: https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes#catch-all-segments
  -------------------------------------------------------------------------------------------------
  - app/docs/[...slug]/page.tsx   <- 모든 Docs 경로 처리
  - app/shop/[[...slug]]/page.tsx <- 모든 Shop 경로 처리 (메인 포함)
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
