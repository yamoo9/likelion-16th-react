import { useCallback, useState } from 'react'

/**
 * useInputV2 커스텀 훅 v2
 * @param initialValue 초기값
 * @returns props: JSX 요소에 주입할 속성 모음
 * @returns methods: 입력 제어를 위한 메서드 모음
 */
export function useInputV2(initialValue = '') {
  const [value, setValue] = useState(initialValue)

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }, [])

  const reset = useCallback(() => {
    setValue(initialValue)
  }, [initialValue])

  return {
    props: {
      value,
      onChange
    },
    methods: {
      reset
    }
  }
}
