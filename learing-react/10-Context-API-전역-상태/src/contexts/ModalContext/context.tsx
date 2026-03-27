import { createContext, useContext } from 'react'
import type { ModalContextType } from './type'

export const ModalContext = createContext<ModalContextType | null>(null)

export const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) throw new Error('useModal 훅은 ModalProvider 내부에서만 사용 가능합니다.')
  return context
}
