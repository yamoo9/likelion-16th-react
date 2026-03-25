import { useCallback, useEffect, useRef, useState } from 'react'

/** [인터페이스: FetchParams] useFetch 훅에 전달할 설정값들 */
interface FetchParams {
  url: string // 요청할 API 주소
  dependencies?: React.DependencyList // 리렌더링을 트리거할 의존성 배열 (기본값: [])
  options?: RequestInit // fetch API의 옵션 (method, headers 등)
}

/** [인터페이스: FetchResult] useFetch 훅이 반환하는 상태와 함수들 */
export interface FetchResult<T> {
  isLoading: boolean // 로딩 여부
  error: Error | null // 발생한 에러 객체
  errorStatus: number | undefined // HTTP 상태 코드 (예: 404, 500)
  data: T | null // 서버로부터 받은 데이터
  refetch: () => void // 데이터를 수동으로 다시 불러오는 함수
}

/**
 * [커스텀 훅: useFetch]
 * 선언적인 방식으로 API 통신을 처리하며, 로딩/에러/데이터 상태를 통합 관리합니다.
 * 
 * @template T - 서버에서 응답받을 데이터의 타입
 * @param {FetchParams} fetchParams - 요청 URL, 의존성, 옵션
 * 
 * @example
 * const { data, isLoading, error, refetch } = useFetch<User[]>({
 *   url: '/api/users',
 *   dependencies: [page]
 * });
 */
export function useFetch<T>(fetchParams: FetchParams): FetchResult<T> {
  const { url, dependencies = [], options = {} } = fetchParams

  // 통신 상태 관리
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [errorStatus, setErrorStatus] = useState<number | undefined>(undefined)
  const [data, setData] = useState<T | null>(null)

  // 객체/배열 형태의 의존성을 안전하게 비교하기 위해 문자열화
  const dependenciesString = JSON.stringify(dependencies)
  const optionsString = JSON.stringify(options)

  // 최신 옵션값을 참조하기 위한 Ref (불필요한 useEffect 재실행 방지)
  const optionsRef = useRef(options)
  useEffect(() => {
    optionsRef.current = options
  }, [options])

  // 데이터 페칭 로직
  useEffect(() => {
    // [경쟁 상태] 컴포넌트가 언마운트되거나 재요청 시 이전 요청을 취소하여 메모리 누수 방지
    const controller = new AbortController()
    const { signal } = controller

    const fetchData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(url, { ...optionsRef.current, signal })

        // HTTP 에러 처리 (4xx, 5xx)
        if (!response.ok) {
          const { status, statusText } = response
          setErrorStatus(status)
          throw new Error(`[에러 발생] ${status}: ${statusText}`)
        }

        const responseData = (await response.json()) as T
        setData(responseData)
      } catch (error) {
        const isError = error instanceof Error
        // 사용자가 요청을 직접 취소한 경우는 에러 상태로 처리하지 않음
        if (isError && error.name === 'AbortError') return
        setError(isError ? error : new Error('알 수 없는 에러 발생'))
      } finally {
        // 요청이 취소되지 않았을 때만 로딩 상태를 해제
        if (!signal.aborted) setIsLoading(false)
      }
    }

    fetchData()

    // [클린업] 다음 요청이 시작되거나 컴포넌트가 사라질 때 현재 요청 취소
    return () => controller.abort()
  }, [url, dependenciesString, optionsString])

  // 수동 리프레시 로직 (trigger 값을 변경하여 useEffect 재실행 유도)
  const [, setTrigger] = useState(0)
  const refetch = useCallback(() => setTrigger((prev) => prev + 1), [])

  return { isLoading, error, errorStatus, data, refetch }
}
