import { useCallback, useEffect, useRef, useState } from 'react'

interface FetchParams {
  url: string
  dependencies?: React.DependencyList
  options?: RequestInit
}

export interface FetchResult<T> {
  isLoading: boolean
  error: Error | null
  errorStatus: number | undefined
  data: T | null
  refetch: () => void
}

export function useFetch<T>(fetchParams: FetchParams) {
  const { url, dependencies = [], options = {} } = fetchParams

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [errorStatus, setErrorStatus] = useState<number | undefined>(undefined)
  const [data, setData] = useState<T | null>(null)

  const dependenciesString = JSON.stringify(dependencies)
  const optionsString = JSON.stringify(options)

  const optionsRef = useRef(options)
  useEffect(() => {
    optionsRef.current = options
  }, [options])

  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller

    const fetchData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(url, { ...optionsRef.current, signal })

        if (!response.ok) {
          const { status, statusText } = response
          setErrorStatus(status)
          throw new Error(`[에러 발생] ${status}: ${statusText}`)
        }

        const responseData = (await response.json()) as T
        setData(responseData)
      } catch (error) {
        const isError = error instanceof Error
        if (isError && error.name === 'AbortError') return
        setError(isError ? error : new Error('알 수 없는 에러 발생'))
      } finally {
        if (!signal.aborted) setIsLoading(false)
      }
    }

    fetchData()

    return () => controller.abort()
  }, [url, dependenciesString, optionsString])

  const [, setTrigger] = useState(0)
  const refetch = useCallback(() => setTrigger((prev) => prev + 1), [])

  return { isLoading, error, errorStatus, data, refetch }
}
