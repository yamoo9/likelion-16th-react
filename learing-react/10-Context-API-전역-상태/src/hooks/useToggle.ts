import { useCallback, useState } from 'react'

export function useToggle(initialValue = false) {
  const [isToggle, setIsToggle] = useState(initialValue)
  const toggle = useCallback(() => setIsToggle((prev) => !prev), [])
  return [isToggle, toggle] as const
}

export type ReturnToggleType = ReturnType<typeof useToggle>