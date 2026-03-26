import { createContext, use } from 'react'
import type { ModalContextType } from './type'

/**
 * [모달 컨텍스트: ModalContext]
 * 앱 전체에서 모달을 띄우고 닫는 기능을 공유하기 위한 컨텍스트입니다.
 * 
 * - 초기값은 null이며, 실제 값은 ModalProvider에서 주입됩니다.
 */
export const ModalContext = createContext<ModalContextType | null>(null)

/**
 * [커스텀 훅: useModal]
 * 컴포넌트 어디서든 모달을 제어할 수 있게 해주는 편리한 인터페이스입니다.
 * 
 * @example
 * const { openModal, closeModal } = useModal();
 * 
 * @throws {Error} ModalProvider 외부에서 호출될 경우 에러를 발생시켜 잘못된 사용을 방지합니다.
 */
export const useModal = () => {
  // React 19의 'use' API를 사용하여 컨텍스트를 구독합니다.
  const context = use(ModalContext)
  
  // 안전 장치: Provider가 없는 곳에서 훅을 사용하면 개발자에게 즉시 알립니다.
  if (!context) {
    throw new Error('useModal 훅은 ModalProvider 내부에서 사용해야 합니다.')
  }
  
  return context
}