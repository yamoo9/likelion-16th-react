'use client'

import { QueryClient, QueryClientProvider, environmentManager } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'

/**
 * @function makeQueryClient
 * @description 새로운 QueryClient 인스턴스를 생성하는 팩토리 함수입니다.
 */
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        /**
         * [중요] staleTime 설정 (60초)
         * SSR 시 서버에서 가져온 데이터를 클라이언트가 받자마자 
         * '상했다(stale)'고 판단하여 즉시 다시 API를 호출하는 것을 방지합니다.
         */
        staleTime: 60 * 1000,
      },
    },
  })
}

/** 클라이언트(브라우저) 환경에서 공유할 싱글톤 QueryClient 변수 */
let browserQueryClient: QueryClient | undefined = undefined

/**
 * @function getQueryClient
 * @description 환경에 따라 적절한 QueryClient 인스턴스를 반환합니다.
 */
function getQueryClient() {
  if (environmentManager.isServer()) {
    // [서버 환경] 
    // 요청마다 독립적인 캐시를 가져야 하므로 항상 새로운 인스턴스를 생성합니다.
    return makeQueryClient()
  } else {
    // [클라이언트 환경] 
    // 브라우저에서는 단 하나의 인스턴스(싱글톤)만 유지하여 캐시를 공유합니다.
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}

/**
 * @component Providers
 * @description 앱 전체를 감싸는 Query Provider입니다. layout.tsx에서 사용합니다.
 * 
 * @example
 * // layout.tsx
 * 
 * export default function RootLayout({ children }: React.PropsWithChildren) {
 *   return (
 *     <html lang="ko-KR">
 *       <body>
 *         <QueryProvider>
 *           {children}
 *         </QueryProvider>
 *       </body>
 *     </html>
 *   )
 * }
 */
export function QueryProvider({ children }: React.PropsWithChildren) {
  /**
   * [참고] useState를 사용한 초기화
   * getQueryClient()를 직접 호출하는 대신 useState의 초기값 함수로 전달하면
   * React가 렌더링 과정에서 인스턴스를 안전하게 관리하도록 보장할 수 있습니다.
   */
  const [queryClient] = useState(() => getQueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}