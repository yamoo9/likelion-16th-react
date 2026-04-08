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

        <main className={cn('mx-auto flex w-full max-w-5xl grow flex-col')}>
          {children}
        </main>

        <Footer />
      </body>
    </html>
  )
}
