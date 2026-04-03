import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'

import { QueryProvider } from '@/contexts/query-context'
import { cn } from '@/utils'

import '@/styles/globals.css'

const notoSansKR = Noto_Sans_KR({ variable: '--font-noto' })

export const metadata: Metadata = {
  title: 'URBAN_LIB < Next.js 러닝 가이드',
  description: '현대적인 웹 경험을 위한 Next.js 프레임워크 학습 플랫폼',
}

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
          <header>
            <nav>
              {/* 내비게이션 바 (로고, 링크, 검색 바 등) */}
              <ul className='flex gap-5 p-5 bg-slate-50'>
                <li>
                  <a href="/">홈 페이지</a>
                </li>
                <li>
                  <a href="/unknown">알 수 없는 페이지</a>
                </li>
              </ul>
            </nav>
          </header>
          <main className={cn('container mx-auto px-6 grow')}>{children}</main>
          <footer className='p-5 bg-slate-100 flex justify-center'>
            <small lang="en" className='text-sm font-medium'>
              {/* 저작권 등 사이트 정보 */}
              &copy; {new Date().getFullYear()} Copylight All Reserved.
            </small>
          </footer>
        </QueryProvider>
      </body>
    </html>
  )
}
