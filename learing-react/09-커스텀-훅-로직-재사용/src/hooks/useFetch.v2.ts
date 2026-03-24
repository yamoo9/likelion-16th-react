import { useEffect, useRef, useState } from 'react'

// --------------------------------------------------------------------------
// 작성 중 (미완성 상태입니다.) 😅 v1 먼저 살펴보고 학습하세요. 
// --------------------------------------------------------------------------

interface FetchParams {
  url: string
  dependencies?: unknown[]
  options?: RequestInit
}

export function useFetchV2<T>({
  url,
  dependencies = [],
  options = {},
}: FetchParams) {
  // 상태 ( 로딩 | 에러 | 데이터 )
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [data, setData] = useState<T | null>(null)

  // 옵션 값 참조 (안전하게 사용) - (값은 기억, 리렌더 유발 ❌)
  const optionsRef = useRef(options)

  // 옵션 동기화 이펙트 (옵션이 변경될 때 새 옵션으로 업데이트)
  useEffect(() => {
    optionsRef.current = options
    console.log(optionsRef.current)
  }, [options])

  // 이펙트 (외부 시스템과 리액트 동기화)
  useEffect(
    () => {
      // 경쟁 상태 (race condition)
      const controller = new AbortController()
      const { signal } = controller

      // 데이터 페칭 함수
      const fetchData = async () => {
        setIsLoading(true)
        setError(null)

        try {
          const response = await fetch(url, { signal, ...optionsRef.current })

          if (!response.ok) {
            throw new Error(
              `네트워크 요청이 실패했습니다. (상태 코드: ${response.status})`,
            )
          }

          const responseData: T = await response.json()
          setData(responseData)
        } catch (error) {
          const isError = error instanceof Error
          if (isError && error.name === 'AbortError') return
          setError(
            isError ? error : new Error('알 수 없는 에러가 발생했습니다.'),
          )
        } finally {
          if (!signal.aborted) setIsLoading(false)
        }
      }

      // 데이터 페칭 함수 실행
      fetchData()

      // 클린업(정리)
      return () => {
        controller.abort()
      }
    },
    // 옵션 의존성 제거 (optionsRef.current 사용) - 무한 루프 방지
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [url, ...dependencies],
  )

  return { isLoading, error, data }
}
