import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'

import { QueryProvider } from '@/contexts/query-context'
import { cn } from '@/utils'

import '@/styles/globals.css'
import Navbar from '@/components/ui/navbar'
import SiteInfo from '@/components/ui/site-info'

const notoSansKR = Noto_Sans_KR({ variable: '--font-noto' })

export const metadata: Metadata = {
  title: 'URBAN_LIB < Next.js 러닝 가이드',
  description: '현대적인 웹 경험을 위한 Next.js 프레임워크 학습 플랫폼',
}

/* 
  app/ 
  ├── layout.tsx           # [Root Layout] 서비스 전체 공통 (GNB, 푸터)
  ├── page.tsx             # [/] 홈 - "북로그에 오신 것을 환영합니다!"
  │
  ├── books/               # [/books] 도서 섹션
  │   ├── layout.tsx       # [/books/*] 도서 섹션 전용 레이아웃 (도서 검색바 등)
  │   ├── page.tsx         # [/books] 도서 전체 목록
  │   └── best/            # [/books/best] 중첩 라우트: 베스트셀러
  │       └── page.tsx     
  │
  ├── categories/          # [/categories] 카테고리 섹션
  │   ├── page.tsx         # [/categories] 카테고리 메인 목록
  │   └── novel/           # [/categories/novel] 중첩 라우트: 소설 장르
  │       └── page.tsx     
  │
  └── profile/             # [/profile] 마이페이지 섹션
      ├── page.tsx         # [/profile] 내 정보 요약
      └── settings/        # [/profile/settings] 중첩 라우트: 설정
          └── page.tsx   
*/

// React Router (Single Page Application : CSR, UX)

// SSR (Application, UX)
// Client-side Transition (CSR + SSR) / RSC Payload (Chunk)

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="ko-KR">
      <body
        className={cn(
          notoSansKR.variable,
          'flex flex-col',
          'min-h-screen overflow-y-scroll',
          'bg-background text-foreground antialiased',
          'selection:bg-foreground selection:text-background',
          'focus:outline-none',
          '[&_*:focus-visible]:ring-foreground [&_*:focus-visible]:ring-2 [&_*:focus-visible]:ring-offset-2',
          '[&_*:focus-visible]:ring-offset-background',
        )}
      >
        <QueryProvider hideDevtools>
          <Navbar />

          <main className={cn('container mx-auto grow')}>{children}</main>

          <SiteInfo />
        </QueryProvider>
      </body>
    </html>
  )
}
