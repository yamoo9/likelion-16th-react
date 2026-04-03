import { environmentManager, QueryClient } from "@tanstack/react-query"

/**
 * @function makeQueryClient
 * @description 새로운 QueryClient 인스턴스를 생성하는 팩토리 함수입니다.
 */
export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        /**
         * [staleTime vs gcTime]
         *
         * staleTime (신선도 유지 기간)
         * - 설정된 시간(60초) 동안은 데이터를 'Fresh'하다고 간주합니다.
         * - 이 기간 내에는 컴포넌트가 다시 마운트되어도 추가 네트워크 요청을 하지 않습니다.
         * - SSR로 가져온 데이터를 클라이언트가 받자마자 다시 fetching 하는 것을 방지하는 핵심 설정입니다.
         *
         * gcTime (메모리 보존 기간)
         * - 데이터가 사용되지 않는 상태(Inactive)가 되었을 때, 메모리(캐시)에 유지하는 시간입니다.
         * - 기본값은 5분이며, staleTime보다 길게 설정하는 것이 권장됩니다.
         * - 이 시간이 지나면 데이터는 가비지 컬렉터에 의해 완전히 삭제됩니다.
         */
        staleTime: 60 * 1000,
        gcTime: 5 * 60 * 1000,
      },
    },
  })
}

/**
 * [클라이언트 전용 싱글톤 변수]
 * 브라우저 환경에서 딱 하나만 생성되어 앱 전체의 캐시 기억력을 담당합니다.
 */
export let browserQueryClient: QueryClient | undefined = undefined

/**
 * @function getQueryClient
 * @description 실행 환경(Server vs Client)에 따라 최적화된 인스턴스를 반환합니다.
 */
export function getQueryClient() {
  if (environmentManager.isServer()) {
    /**
     * [서버 환경: Isolation]
     * 서버는 여러 사용자의 요청을 동시에 처리합니다.
     * 요청 간 데이터 오염(A 사용자의 데이터를 B가 보는 현상)을 막기 위해
     * 매 요청마다 항상 새로운 QueryClient를 생성하여 격리합니다.
     */
    return makeQueryClient()
  } else {
    /**
     * [클라이언트 환경: Singleton]
     * 브라우저에서는 사용자가 페이지를 이동해도 이전 데이터를 기억해야 합니다.
     * 따라서 단 하나의 인스턴스만 유지하여 캐시 재사용성을 극대화합니다.
     */
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}