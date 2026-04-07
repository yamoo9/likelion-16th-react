import { useEffect, useRef } from 'react'

// 포커스 가능한 요소들을 찾는 쿼리 셀렉터
const FOCUSABLE_ELEMENTS = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * [접근성 개선 훅: useFocusTrap]
 * 특정 요소(ref) 안에 키보드 포커스를 가둡니다.
 * 모달(Modal), 대화상자(Dialog), 드로워(Drawer) 등에서 사용자가 Tab 키를 눌러도 
 * 배경의 다른 요소로 포커스가 나가지 않도록 제한하여 웹 접근성을 향상시킵니다.
 * 
 * @template T - 트랩을 적용할 컨테이너 요소의 타입 (기본: HTMLElement)
 * @param isActive - 훅의 활성화 여부 (모달이 열려있을 때만 활성화)
 * @returns 트랩을 적용할 컨테이너 요소에 연결할 Ref 객체
 * 
 * @example
 * // 1. 기본 모달 컴포넌트에서의 활용
 * const Modal = ({ isOpen, onClose, children }) => {
 *   const modalRef = useFocusTrap<HTMLDivElement>(isOpen)
 * 
 *   if (!isOpen) return null
 * 
 *   return (
 *     <div className="modal-overlay">
 *       <div ref={modalRef} role="dialog" aria-modal="true">
 *         {children}
 *         <button onClick={onClose}>닫기</button>
 *       </div>
 *     </div>
 *   )
 * }
 * 
 * @example
 * // 2. 복잡한 폼이 포함된 드로워(Drawer)
 * const Drawer = ({ isVisible }) => {
 *   const drawerRef = useFocusTrap<HTMLElement>(isVisible)
 *   
 *   return (
 *     <aside ref={drawerRef} className={isVisible ? 'show' : ''}>
 *       <input type="text" placeholder="이름" />
 *       <textarea placeholder="내용" />
 *       <button type="submit">저장</button>
 *     </aside>
 *   )
 * }
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
        // Shift + Tab (역방향): 첫 번째 요소에서 누르면 마지막 요소로 이동
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        }
      } else {
        // Tab (정방향): 마지막 요소에서 누르면 첫 번째 요소로 이동
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    }

    trapElement.addEventListener('keydown', handleKeyDown)

    // 클린업 함수: 이벤트 제거 및 포커스 복원
    return () => {
      trapElement.removeEventListener('keydown', handleKeyDown)
      // 모달이 닫힐 때, 모달을 열기 전 포커스가 있던 원래 요소(예: 열기 버튼)로 포커스 복원
      previouslyFocusedElement?.focus()
    }
  }, [isActive])

  return ref
}