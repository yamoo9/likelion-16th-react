import { useEffect, useState } from 'react'

export function useFetchV1<T>(url: string) {
  // 상태 ( 로딩 | 에러 | 데이터 )
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [data, setData] = useState<T | null>(null)

  // 이펙트 (외부 시스템과 리액트 동기화)
  useEffect(() => {
    // 경쟁 상태 (race condition)
    const controller = new AbortController()
    const { signal } = controller

    // 데이터 페칭 함수
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(url, { signal })

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
        setError(isError ? error : new Error('알 수 없는 에러가 발생했습니다.'))
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
  }, [url])

  return { isLoading, error, data }
}
