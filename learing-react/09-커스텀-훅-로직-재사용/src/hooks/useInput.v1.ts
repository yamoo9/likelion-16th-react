import { useCallback, useState } from 'react'

/**
 * useInputV1 커스텀 훅 v1
 * @param initialValue 초기값
 * @returns {Object} 입력 값, 입력 핸들러, 초기화 함수
 */
export function useInputV1(initialValue = ''): object {
  const [value, setValue] = useState(initialValue)

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }, [])

  const reset = useCallback(() => {
    setValue(initialValue)
  }, [initialValue])

  return { value, onChange, reset }
}
