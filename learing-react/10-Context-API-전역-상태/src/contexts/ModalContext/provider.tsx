import { startTransition, useCallback, useId, useState } from 'react'
import type { ModalData } from './type'
import { ModalContext } from './context'

export function ModalProvider({ children }: React.PropsWithChildren) {
  const modalTitleId = useId()
  const [modal, setModal] = useState<ModalData | null>(null)
  const [isClosing, setIsClosing] = useState(false)

  const open = useCallback((title: string, content: React.ReactNode) => {
    setIsClosing(false)
    startTransition(() => {
      setModal({ title, content })
    })
  }, [])

  const close = useCallback(() => {
    setIsClosing(true)
  }, [])

  const confirmClose = useCallback(() => {
    setModal(null)
    setIsClosing(false)
  }, [])

  return (
    <ModalContext.Provider
      value={{ modal, isClosing, modalTitleId, open, close, confirmClose }}
    >
      {children}
    </ModalContext.Provider>
  )
}
