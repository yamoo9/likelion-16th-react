import type { Metadata } from 'next'
import '@/styles/globals.css'

// Metadata 내보내기
export const metadata: Metadata = {
  title: 'Next.js 러닝 가이드',
  description: 'Next.js 메타 프레임워크 학습하기'
}

/**
 * [RSC] React Server Component
 * - Next.js의 기본이 되는 컴포넌트
 * - React 개발자 도구에서 확인 가능 (server 배지 오른쪽에 표시)
 */
export default function RootLayout({ children }: React.PropsWithChildren) {
  
  // [서버 사이드 렌더링]
  // - React 서버 컴포넌트(RSC) → HTML 페이지 렌더링 → 클라이언트(브라우저)에 전송
  return (
    <html lang="ko-KR">
      <body className="min-h-screen overflow-y-scroll bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-slate-50">{children}</body>
    </html>
  )
}
