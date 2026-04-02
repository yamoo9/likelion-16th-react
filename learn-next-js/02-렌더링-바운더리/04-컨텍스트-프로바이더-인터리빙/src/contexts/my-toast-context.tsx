'use client'

import { Toaster } from 'react-hot-toast'

export function MyToastProvider({ children }: React.PropsWithChildren) {
  return (
    <>
      <Toaster />
      {children}
    </>
  )
}
