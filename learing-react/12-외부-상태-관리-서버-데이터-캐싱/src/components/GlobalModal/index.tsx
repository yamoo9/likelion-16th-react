import { useEffect, useRef, useId } from 'react'
import { createPortal } from 'react-dom'

import useModalStore from '@/stores/modalStore'
import S from './style.module.css'

const FOCUSABLE_SELECTOR = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

export default function GlobalModal() {
  const modalTitleId = useId()
  
  // Zustand 스토어에서 상태와 액션을 가져옵니다.
  const { modal, isClosing, closeModal, finishClosing } = useModalStore()
  const previousFocusRef = useRef<HTMLElement | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  // 애니메이션 종료 핸들러
  const handleTransitionEnd = () => {
    if (isClosing) {
      finishClosing() // 스토어의 modal 데이터를 null로 비움
    }
  }

  useEffect(() => {
    if (!modal) {
      previousFocusRef.current?.focus()
      return
    }

    // 모달 열릴 때 현재 포커스 저장
    previousFocusRef.current = document.activeElement as HTMLElement
    document.body.style.overflow = 'hidden'

    const timer = setTimeout(() => {
      modalRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)?.focus()
    }, 0)

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
      if (e.key === 'Tab' && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
        const first = focusables[0]
        const last = focusables[focusables.length - 1]

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
      clearTimeout(timer)
    }
  }, [modal, closeModal])

  if (!modal) return null

  return createPortal(
    <div
      role="presentation"
      className={S.overlay}
      data-closing={isClosing}
      onTransitionEnd={handleTransitionEnd}
      onClick={closeModal}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={modalTitleId}
        ref={modalRef}
        className={S.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id={modalTitleId} className="sr-only">{modal.title}</h2>
        <div className={S.content}>{modal.content}</div>
        
        {/* 닫기 버튼 (필요시 노출) */}
        <button type="button" className="sr-only" onClick={closeModal}>
          닫기
        </button>
      </div>
    </div>,
    document.body
  )
}