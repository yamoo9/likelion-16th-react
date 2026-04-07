'use client'

import { useEffect } from 'react'

export const ScrollToTop = () => {
  useEffect(() => {
    globalThis.scrollTo(0, 0)
  }, [])

  return null
}
