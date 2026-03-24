import { useCallback, useState } from 'react'

export function useInputV2(initialValue = '') {
  const [value, setValue] = useState(initialValue)

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }, [])

  const reset = useCallback(() => {
    setValue(initialValue)
  }, [initialValue])

  return [{ value, onChange }, { reset }] as const
}
