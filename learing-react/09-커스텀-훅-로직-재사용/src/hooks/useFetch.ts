import { useCallback, useEffect, useRef, useState } from 'react'

interface FetchParams {
  url: string
  dependencies?: React.DependencyList
  options?: RequestInit
}

export function useFetch<T>({
  url,
  // ⚠️ 참조 동일성 유지되어야만 리렌더링 방지
  //    다른 참조 객체가 전달될 경우 요청이 무한 루프됨
  dependencies = [],
  options = {},
}: FetchParams) {
  
  // 상태 ( 로딩 | 에러 | 데이터 )
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [data, setData] = useState<T | null>(null)

  // 종속성, 옵션 비교를 위한 문자화
  const optionsString = JSON.stringify(options)
  const dependenciesString = JSON.stringify(dependencies)

  // 전달된 options 객체의 값 참조
  const optionsRef = useRef(options) // { current: options }
  
  // 이펙트 (optionsString 변화 감지)
  useEffect(() => {
    // options 객체가 변경되면 optionsRef.current 값으로 options 업데이트
    optionsRef.current = options
    
    // [ESLint 비활성 주석이 추가된 이유]
    // options이 변경될 때마다 optionsString이 바뀌므로 
    // options 객체를 종속성 배열에 넣을 필요가 없음
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionsString])

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

          // fetch 옵션 객체 (외부에서 전달된 options 참조 객체와 signal 합성)
          const fetchConfig = { ...optionsRef.current, signal }
          const response = await fetch(url, fetchConfig)

          if (!response.ok) {
            const errorMessage = `[에러 발생] ${response.status} ${response.statusText}`
            throw new Error(errorMessage)
          }

          const responseData: T = await response.json()
          setData(responseData)
        } catch (err) {
          const isError = err instanceof Error
          if (isError && err.name === 'AbortError') return
          const error = isError ? err : new Error('알 수 없는 에러가 발생했습니다.')
          setError(error)
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
    [url, dependenciesString],
  )

  // 함수를 다시 실행하기하는 상태 선언
  const [, setTrigger] = useState(0) 

  // 리페치 (refetch) 다시 서버에 요청/응답 받는 기능(함수)
  const refetch = useCallback(() => {
    // 트리거 업데이트 요청 (useFetch 함수가 동일한 옵션과 종속성으로 다시 실행)
    setTrigger((prev) => prev + 1)
  }, [])

  return { isLoading, error, data, refetch }
}