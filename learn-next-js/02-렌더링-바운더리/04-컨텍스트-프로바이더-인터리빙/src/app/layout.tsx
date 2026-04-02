import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import { cn } from '@/utils'
import '@/styles/globals.css'
import { NotiProvider } from '@/_learn/contexts/noti-context'

const notoSansKR = Noto_Sans_KR({ variable: '--font-noto' })

export const metadata: Metadata = {
  title: 'Next.js 러닝 가이드',
  description:
    '보다 나은 웹 경험을 위한 Next.js 프레임워크 사용 방법을 학습합니다.',
}

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="ko-KR">
      <body
        className={cn(
          'overflow-y-scroll',
          notoSansKR.variable,
          'selection:bg-foreground selection:text-background',
        )}
      >
        {/* 클라이언트 컴포넌트인 프로바이더가 감쌌는데 (인터리빙) 결과는? 서버 컴포넌트 유지, 클라이언트 컴포넌트와 마찬가지로 삽입 가능 */}
        <NotiProvider>
          {children}
        </NotiProvider>
      </body>
    </html>
  )
}
