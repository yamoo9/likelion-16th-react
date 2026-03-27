import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

import { CloseIcon } from './ModalIcon'
import { useModal } from '@/contexts'
import S from './style.module.css'

export function GlobalModal() {
  const { modal, isClosing, modalTitleId, close, confirmClose } = useModal()
  const modalRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!modal) {
      previousFocusRef.current?.focus()
      return
    }

    previousFocusRef.current = document.activeElement as HTMLElement
    const originalStyle = getComputedStyle(document.body).overflow
    document.body.style.overflow = 'hidden'

    const timer = setTimeout(() => {
      modalRef.current?.querySelector('button')?.focus()
    })

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'Tab' && modalRef.current) {
        const nodes = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        const first = nodes[0]
        const last = nodes[nodes.length - 1]

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
      document.body.style.overflow = originalStyle
      window.removeEventListener('keydown', handleKeyDown)
      clearTimeout(timer)
    }
  }, [modal, close])

  if (!modal) return null

  return createPortal(
    <div
      role="presentation"
      className={S.overlay}
      data-closing={isClosing}
      onTransitionEnd={() => isClosing && confirmClose()}
      onClick={close}
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
        <button type="button" className={S.closeButton} aria-label="닫기" onClick={close}>
          <CloseIcon />
        </button>
      </div>
    </div>,
    document.body
  )
}