import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'

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
  ------------------------------------------------------------------------
  Next.js App Router 실습: 북로그 (BookLog) - 동적 세그먼트(Dynamic Segments)
  ------------------------------------------------------------------------
  - 실습 목표: 동적 세그먼트([id])를 활용한 상세 페이지 구현
  - 핵심 개념: 폴더 이름에 [ ]를 사용하면 URL의 해당 부분이 '변수'가 됩니다.
  ------------------------------------------------------------------------

  app/ 
  ├── layout.tsx           # [Root Layout] 전체 공통 (상단 네비게이션)
  ├── page.tsx             # [/] 홈
  │
  ├── books/               
  │   ├── layout.tsx       # [/books/*] 도서 섹션 공통 (검색바, 도서 카테고리 탭)
  │   ├── page.tsx         # [/books] 전체 도서 목록
  │   ├── best/            # [/books/best] 베스트셀러
  │   │   └── page.tsx     
  │   │
  │   └── [bookId]/        # ✨ [동적 세그먼트] 도서 상세 페이지
  │       └── page.tsx     # [/books/1, /books/react-guide 등 모든 상세 페이지]
  │
  ├── categories/          
  │   ├── page.tsx         
  │   └── novel/           
  │       └── page.tsx     
  │
  └── profile/             
      ├── page.tsx         
      └── settings/        
          └── page.tsx     
*/


export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="ko-KR">
      <body
        className={cn(
          notoSansKR.variable,
          'min-h-screen overflow-y-scroll',
          'flex flex-col',
          'bg-background text-foreground antialiased',
          'selection:bg-foreground selection:text-background',
        )}
      >
       
        <Navbar />

        <main className={cn('container mx-auto', 'grow px-6 py-4 lg:py-6')}>
          {children}
        </main>

        <SiteInfo />
        
      </body>
    </html>
  )
}
