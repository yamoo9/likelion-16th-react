import { useEffect, useState } from 'react'

export function useDebounce(value: string, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timerId)
  }, [value, delay])

  return [debouncedValue, setDebouncedValue] as const
}
