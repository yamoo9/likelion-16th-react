import { create } from 'zustand'
import { useShallow } from 'zustand/shallow'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

/**
 * [모달 데이터 인터페이스]  
 * title: 스크린 리더 및 헤더에 표시될 제목  
 * content: 모달 내부에 렌더링할 리액트 요소 (JSX)  
 */
interface ModalData {
  title: string
  content: React.ReactNode
}

interface ModalState {
  
  // 상태 (State)
  modal: ModalData | null
  isClosing: boolean

  // 액션 (Actions)
  openModal: (title: string, content: React.ReactNode) => void
  closeModal: () => void // 즉시 제거하지 않고 isClosing만 true로 변경하여 CSS 애니메이션을 트리거합니다.
  finishClosing: () => void // 애니메이션이 끝난 후 호출되어 메모리에서 모달 데이터를 삭제합니다. (handleTransitionEnd 역할)
}

/**
 * 모달 상태 관리 스토어
 */
const useModalStore = create<ModalState>()(
  devtools(
    immer((set) => ({

      // --- 초기 상태 ---

      modal: null,
      isClosing: false,

      // --- 액션 구현 ---
      
      /**
       * [모달 열기: openModal]  
       * 모달 데이터를 설정하고 모달을 엽니다.  
       * @param title - 모달 제목
       * @param content - 모달 내용 (ReactNode)
       */
      openModal: (title, content) => {
        set((state) => {
          state.modal = { title, content }
          state.isClosing = false
        }, false, 'modal/openModal')
      },

      /**
       * [모달 닫기 시작: closeModal]  
       * 모달을 닫기 시작하고 애니메이션을 트리거합니다.  
       */
      closeModal: () => {
        set((state) => {
          state.isClosing = true
        }, false, 'modal/closeModal')
      },

      /**
       * [모달 닫기 완료: finishClosing]  
       * 닫힘 애니메이션이 끝난 후 모달 데이터를 메모리에서 삭제합니다.  
       */
      finishClosing: () => {
        set((state) => {
          if (state.isClosing) { 
            state.modal = null
            state.isClosing = false
          }
        }, false, 'modal/finishClosing')
      },
    })),
    { name: 'ModalStore' }
  )
)

/** 
 * 상태와 액션을 모두 포함한 통합 훅입니다.  
 * 
 * @example
 * const { modal, openModal, closeModal } = useModal()
 * 
 * const handleConfirm = () => {
 *   openModal("삭제 확인", <p>정말 삭제하시겠습니까?</p>)
 * }
 */
export const useModal = () => {
  return useModalStore(
    useShallow((state) => ({
      modal: state.modal,
      isClosing: state.isClosing,
      openModal: state.openModal,
      closeModal: state.closeModal,
      finishClosing: state.finishClosing,
    }))
  )
}

/**
 * 현재 모달이 '존재'하는지 여부만 확인합니다.  
 * 닫힘 애니메이션 중(isClosing: true)에도 modal 데이터가 있다면 true를 반환합니다.
 * 
 * @example
 * function ModalOverlay() {
 *   const isOpen = useIsModalOpen()
 * 
 *   if (!isOpen) return null
 * 
 *   return <div className="overlay" />
 * }
 */
export const useIsModalOpen = () => useModalStore((state) => !!state.modal)

/**
 * 현재 모달이 완전히 비어있는지 확인합니다.  
 * 주로 모달이 없을 때 배경을 렌더링하지 않기 위한 조건문에서 사용합니다.
 */
export const useIsModalClose = () => useModalStore((state) => !state.modal)

/** 
 * 현재 닫힘 애니메이션이 진행 중인지 확인합니다.  
 * CSS 클래스 바인딩이나 페이지 이동 로직(useEffect)에서 감시용으로 사용합니다.
 */
export const useIsModalClosing = () => useModalStore((state) => state.isClosing)

/**
 * 현재 열린 모달의 제목과 내용을 가져옵니다.  
 * 모달 렌더러 컴포넌트에서 UI를 그릴 때 사용합니다.
 * 
 * @example
 * function ModalRenderer() {
 *   const modalData = useModalData()
 *   if (!modalData) return null
 *   
 *   return (
 *     <div className="modal">
 *       <h1>{modalData.title}</h1>
 *       <div>{modalData.content}</div>
 *     </div>
 *   )
 * }
 */
export const useModalData = () => useModalStore((state) => state.modal)

/**
 * 모달을 제어하는 함수들만 반환합니다.  
 * 컴포넌트가 상태 변화에 반응하여 불필요하게 리렌더링되는 것을 방지합니다.
 * 
 * @example
 * // 1. 모달 열기/닫기 버튼에서 사용
 * function ControlButtons() {
 *   const { openModal, closeModal } = useModalActions()
 * 
 *   return (
 *     <>
 *       <button type="button" onClick={() => openModal("공지", <p>내용</p>)}>열기</button>
 *       <button type="button" onClick={closeModal}>닫기 시작</button>
 *     </>
 *   )
 * }
 * 
 * @example
 * // 2. 모달 렌더러에서 애니메이션 종료 처리 시 사용
 * function ModalOverlay() {
 *   const isClosing = useIsClosing()
 *   const { finishClosing } = useModalActions()
 *   
 *   return (
 *     <div 
 *       className="overlay" 
 *       data-closing={isClosing} 
 *       onTransitionEnd={finishClosing} // 애니메이션 완료 후 상태 초기화
 *     >
 *       ...
 *     </div>
 *   )
 * }
 */
export const useModalActions = () => {
  return useModalStore(
    useShallow((state) => ({
      openModal: state.openModal,
      closeModal: state.closeModal,
      finishClosing: state.finishClosing,
    }))
  )
}

export default useModalStore