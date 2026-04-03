import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'

import { cn } from '@/utils'
import Navbar from '@/components/ui/navbar'
import SiteInfo from '@/components/ui/site-info'

import '@/styles/globals.css'
import { QueryProvider } from './contexts/query-context'


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
          '[&_*:focus-visible]:ring-2 [&_*:focus-visible]:ring-foreground [&_*:focus-visible]:ring-offset-2',
          '[&_*:focus-visible]:ring-offset-background'
        )}
      >
        <QueryProvider hideDevtools>
          <Navbar />
          <main className={cn('container mx-auto px-6 grow')}>
            {children}
          </main>
          <SiteInfo />
        </QueryProvider>
      </body>
    </html>
  )
}
