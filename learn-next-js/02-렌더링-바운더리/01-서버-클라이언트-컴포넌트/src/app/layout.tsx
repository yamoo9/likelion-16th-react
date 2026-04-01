import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'

import { cn } from '@/utils'
import '@/styles/globals.css'

const notoSansKR = Noto_Sans_KR({ variable: '--font-noto' })

export const metadata: Metadata = {
  title: 'Next.js 러닝 가이드',
  description: '보다 나은 웹 경험을 위한 Next.js 프레임워크 사용 방법을 학습합니다.',
}

// 서버 컴포넌트 (Server Component)
export default function RootLayout({ children }: React.PropsWithChildren) {

  return (
    <html lang="ko-KR">
      <body className={cn('overflow-y-scroll', notoSansKR.variable)}>
        {children}
      </body>
    </html>
  )
}
