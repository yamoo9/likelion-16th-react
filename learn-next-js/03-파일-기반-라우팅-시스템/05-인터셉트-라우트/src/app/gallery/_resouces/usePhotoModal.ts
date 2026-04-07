import { useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'

export function usePhotoModal(id: string) {
  const router = useRouter()
  const modalRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)

  const idNum = parseInt(id)
  const prevId = idNum > 1 ? idNum - 1 : 3
  const nextId = idNum < 3 ? idNum + 1 : 1

  const closeModal = useCallback(() => {
    router.back()
    const target = triggerRef.current
    if (target) setTimeout(() => target?.focus(), 50)
  }, [router])

  useEffect(() => {
    triggerRef.current = document.activeElement as HTMLElement
    document.body.style.overflowY = 'hidden'
    const timerId = setTimeout(() => modalRef.current?.focus(), 50)

    return () => {
      clearTimeout(timerId)
      document.body.style.overflowY = 'scroll'
      if (triggerRef.current) setTimeout(() => triggerRef.current?.focus(), 50)
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!modalRef.current) return

      if (e.key === 'ArrowLeft') router.replace(`/gallery/photo/${prevId}`, { scroll: false })
      if (e.key === 'ArrowRight') router.replace(`/gallery/photo/${nextId}`, { scroll: false })
      if (e.key === 'Escape') closeModal()

      if (e.key === 'Tab') {
        const focusable = modalRef.current.querySelectorAll('button, a, [tabindex="0"]')
        const first = focusable[0] as HTMLElement
        const last = focusable[focusable.length - 1] as HTMLElement

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [prevId, nextId, router, closeModal])

  return { modalRef, prevId, nextId, closeModal }
}