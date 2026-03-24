import { useCallback, useRef, useState } from 'react'

type InputOrTextarea = HTMLInputElement | HTMLTextAreaElement

export function useInput<T extends InputOrTextarea>(initialValue = '') {
  const ref = useRef<T>(null)
  const [value, setValue] = useState(initialValue)

  const onChange = useCallback((e: React.ChangeEvent<T>) => {
    setValue(e.target.value)
  }, [])

  const reset = useCallback(() => setValue(initialValue), [initialValue])
  const focus = useCallback(() => { ref.current?.focus() }, [])
  const select = useCallback(() => { ref.current?.select() }, [])

  return { 
    props: { ref, value, onChange }, 
    methods: { reset, focus, select, setValue } 
  }
}
