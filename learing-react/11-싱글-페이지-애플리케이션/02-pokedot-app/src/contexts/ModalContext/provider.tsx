import {
  useState,
  useEffect,
  useRef,
  useId,
  useCallback,
  startTransition,
} from 'react'
import { createPortal } from 'react-dom'
import type { ModalData } from './type'
import { ModalContext } from './context'
import S from './style.module.css'

const { body } = document

/**
 * [포커스 가능 요소 선택자]
 * 웹 접근성 표준에 따라 키보드 포커스를 받을 수 있는 모든 요소를 정의합니다.
 * 상수로 분리하여 유지보수성과 가독성을 높였습니다.
 */
const FOCUSABLE_SELECTOR = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

type Props = React.PropsWithChildren<{
  hideCloseButton?: boolean
}>

/**
 * [모달 공급자: ModalProvider]
 * 앱 전체의 모달 상태를 관리하며, 접근성과 애니메이션이 포함된 모달 UI를 렌더링합니다.
 */
export function ModalProvider({ children, hideCloseButton = true }: Props) {
  const modalTitleId = useId() // 접근성을 위한 고유 ID 생성

  /* --- 상태 관리 (State) --- */
  const [modal, setModal] = useState<ModalData | null>(null) // 모달 데이터 (제목, 내용)
  const [isClosing, setIsClosing] = useState(false)          // 닫힘 애니메이션 진행 여부

  const modalRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null) // 모달 열기 전 포커스 위치 저장

  /* --- 액션: 열기/닫기 (Actions) --- */

  // 모달 열기
  const openModal = useCallback((title: string, content: React.ReactNode) => {
    // 현재 포커스된 요소를 기억 (모달 닫힌 후 돌아갈 위치)
    previousFocusRef.current = document.activeElement as HTMLElement
    setIsClosing(false)

    // React 18+ startTransition: UI 업데이트 우선순위를 조절하여 부드러운 전환 유도
    startTransition(() => {
      setModal({ title, content })
    })
  }, [])

  // 모달 닫기 (애니메이션 시작)
  const closeModal = useCallback(() => {
    setIsClosing(true)
  }, [])

  // 애니메이션 종료 핸들러: CSS transition이 끝나면 실제 상태를 null로 변경
  const handleTransitionEnd = () => {
    if (isClosing) {
      setModal(null)
      setIsClosing(false)
    }
  }

  /* --- 접근성 및 스크롤 제어 (Side Effects) --- */
  useEffect(() => {
    if (!modal) {
      // 모달이 닫히면 이전 포커스 위치로 복구 (접근성 핵심)
      previousFocusRef.current?.focus()
      return
    }

    // 배경 스크롤 방지
    const originalStyle = getComputedStyle(body).getPropertyValue('overflow')
    body.style.setProperty('overflow', 'hidden')

    // 초기 포커스 설정 (모달 내 첫 번째 포커스 가능 요소로)
    const timer = setTimeout(() => {
      modalRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)?.focus()
    })

    // 키보드 이벤트 처리 (ESC로 닫기, Tab 포커스 트랩)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()

      const modalElement = modalRef.current
      if (e.key === 'Tab' && modalElement) {
        const focusables = modalElement.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
        const first = focusables[0]
        const last = focusables[focusables.length - 1]

        // 포커스 트랩: 모달 밖으로 포커스가 나가지 않도록 가둠
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    globalThis.addEventListener('keydown', handleKeyDown)

    return () => {
      // [클린업] 스크롤 복구 및 이벤트 제거
      document.body.style.setProperty('overflow', originalStyle)
      globalThis.removeEventListener('keydown', handleKeyDown)
      clearTimeout(timer)
    }
  }, [closeModal, modal])

  return (
    <ModalContext value={{ isClosing, openModal, closeModal }}>
      {children}

      {/* 
        [React Portal] 
        모달을 DOM 트리의 최상단(body)으로 옮겨 렌더링합니다. 
        부모 컴포넌트의 CSS(z-index, overflow) 영향을 받지 않기 위함입니다.
      */}
      {modal &&
        createPortal(
          <div
            role="presentation"
            className={S.overlay}
            data-closing={isClosing} // CSS 애니메이션 트리거
            onTransitionEnd={handleTransitionEnd}
            onClick={closeModal} // 오버레이 클릭 시 닫기
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby={modalTitleId}
              ref={modalRef}
              className={S.modal}
              onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫힘 방지
            >
              <h2 id={modalTitleId} className="sr-only">
                {modal.title}
              </h2>

              <div className={S.content}>{modal.content}</div>

              <button
                type="button"
                className={`${S.closeButton} ${hideCloseButton ? 'sr-only' : ''}`.trim()}
                aria-label="닫기"
                onClick={closeModal}
              >
                <CloseIcon />
              </button>
            </div>
          </div>,
          body,
        )}
    </ModalContext>
  )
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18" /><path d="m6 6 12 12" />
    </svg>
  )
}