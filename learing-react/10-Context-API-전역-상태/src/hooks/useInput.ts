import { useCallback, useRef, useState } from 'react'

type InputOrTextarea = HTMLInputElement | HTMLTextAreaElement

export interface ReturnInputType<T extends InputOrTextarea = HTMLInputElement> {
  props: {
    ref: React.RefObject<T | null>
    value: string
    onChange: (e: React.ChangeEvent<T, Element>) => void
  }
  methods: {
    reset: () => void
    focus: () => void
    select: () => void
    setValue: React.Dispatch<React.SetStateAction<string>>
  }
}

export function useInput<T extends InputOrTextarea = HTMLInputElement>(
  initialValue = '',
): ReturnInputType<T> {
  const ref = useRef<T>(null)
  const [value, setValue] = useState(initialValue)

  const onChange = useCallback((e: React.ChangeEvent<T>) => {
    setValue(e.target.value)
  }, [])

  const reset = useCallback(() => setValue(initialValue), [initialValue])
  const focus = useCallback(() => {
    ref.current?.focus()
  }, [])
  const select = useCallback(() => {
    ref.current?.select()
  }, [])

  return {
    props: { ref, value, onChange },
    methods: { reset, focus, select, setValue },
  }
}
