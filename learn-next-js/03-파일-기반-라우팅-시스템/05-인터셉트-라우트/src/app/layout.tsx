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
  ---------------------------------------------------------------------------------------
  Next.js App Router 인터셉트 라우트 (Intercepting Routes)
  ---------------------------------------------------------------------------------------
  - 문제점: 갤러리에서 사진을 클릭했을 때 전체 페이지가 전환되면, 
          사용자는 기존 리스트의 스크롤 위치를 잃어버리고 맥락이 끊기는 불편함을 겪음.
  - 해결책: 특정 경로로 이동할 때 브라우저의 URL은 변경하되, 현재 레이아웃 내에서 
          다른 경로의 콘텐츠(모달 등)를 가로채서 표시. (Soft Navigation)
  ---------------------------------------------------------------------------------------

  src/app/gallery/
  ├── layout.tsx              # [갤러리 레이아웃] children과 @modal 슬롯을 함께 렌더링
  ├── page.tsx                # [/gallery] 포토 리스트 메인 페이지
  │
  ├── @modal/                 # [병렬 슬롯] 인터셉트된 콘텐츠가 담길 공간
  │   ├── (.)photo/[id]/      # [인터셉터] 동일 레벨(.)의 /photo/[id] 경로를 가로챔
  │   │   └── page.tsx        # 모달 형태로 구현된 상세 페이지 (사용자에게 보여지는 UI)
  │   └── default.tsx         # 모달이 없을 때(기본 상태) null을 반환하여 슬롯 비우기
  │
  └── photo/[id]/             # [원본 라우트] 실제 상세 페이지 경로
      └── page.tsx            # 새로고침이나 직접 접속 시 보여지는 전체 화면 페이지
  
  ---------------------------------------------------------------------------------------
  실습 목표: "리스트 유지 + 상세 모달" 패턴의 사용자 경험(UX) 구현하기!
  참고: https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes
  ---------------------------------------------------------------------------------------
  1. (.)photo/[id] 폴더를 생성하여 /gallery/photo/[id] 접속을 가로채도록 설정.
  2. @modal/default.tsx에서 `return null`을 작성하여 초기 상태에 모달이 뜨지 않게 처리.
  3. 인터셉트된 page.tsx에서는 `usePhotoModal` 훅을 사용하여 
     접근성(Focus Trap)과 닫기(router.back) 기능을 구현.
  4. 원본 photo/[id]/page.tsx에도 동일한 UI 혹은 전체 화면용 UI를 작성하여 
     새로고침 시에도 데이터가 정상적으로 표시되도록 대응.
  ---------------------------------------------------------------------------------------
  인터셉트 라우트 기호의 의미
  - (.): 동일 레벨의 경로를 가로챕니다.
  - (..): 한 단계 위 레벨의 경로를 가로챕니다.
  - (..)(..): 두 단계 위 레벨의 경로를 가로챕니다.
  - (...): 루트(app) 디렉토리부터의 경로를 가로챕니다.
  ---------------------------------------------------------------------------------------
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
        <main
          className={cn(
            'mx-auto flex w-full max-w-5xl grow flex-col px-6 py-8',
            'lg:py-12',
          )}
        >
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
