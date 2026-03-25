import { useEffect, useRef } from 'react'

// 포커스 가능한 요소들을 찾는 쿼리 셀렉터
const FOCUSABLE_ELEMENTS = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * [접근성 개선 훅: useFocusTrap]
 * 특정 요소(ref) 안에 키보드 포커스를 가둡니다.
 * 모달, 대화상자 등에서 사용됩니다.
 * @param isActive - 훅의 활성화 여부
 */
export function useFocusTrap<T extends HTMLElement>(isActive: boolean) {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (!isActive || !ref.current) return

    const trapElement = ref.current
    const focusableElements = Array.from(
      trapElement.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS),
    )
    
    if (focusableElements.length === 0) return

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]
    const previouslyFocusedElement = document.activeElement as HTMLElement

    // 포커스를 트랩 내부의 첫 번째 요소로 이동
    firstElement.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        // Shift + Tab (역방향)
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        }
      } else {
        // Tab (정방향)
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    }

    trapElement.addEventListener('keydown', handleKeyDown)

    // 클린업 함수
    return () => {
      trapElement.removeEventListener('keydown', handleKeyDown)
      // 포커스를 원래 있던 요소로 복원
      previouslyFocusedElement?.focus()
    }
  }, [isActive])

  return ref
}
