'use client'

import { useState } from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClientProvider } from '@tanstack/react-query'
import { getQueryClient } from '@/functions/query-client'

/**
 * @component QueryProvider
 * @description 앱 전체에 React Query 상태를 주입하는 프로바이더입니다.
 * 클라이언트 컴포넌트이지만, Next.js 특성상 서버에서도 초기 렌더링(SSR)이 수행됩니다.
 */
export function QueryProvider({
  children,
  hideDevtools = false,
}: React.PropsWithChildren<{ hideDevtools?: boolean }>) {
  /**
   * [지연 초기화 (Lazy Initialization)]
   * useState(() => getQueryClient()) 형태로 전달하여
   * 리액트 렌더링 생명주기 내에서 초기 렌더링 시 딱 한 번만 실행되도록 보장합니다.
   * 이는 불필요한 인스턴스 생성을 방지하고 클라이언트 측 싱글톤을 안전하게 바인딩합니다.
   */
  const [queryClient] = useState(() => getQueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {hideDevtools || <ReactQueryDevtools initialIsOpen />}
    </QueryClientProvider>
  )
}