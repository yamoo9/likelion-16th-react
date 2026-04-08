import { useCallback, useState } from 'react'

/**
 * [커스텀 훅: useToggle]  
 * 불리언(true/false) 상태를 반전시키는 로직을 캡슐화합니다.  
 * 모달 열기/닫기, 체크박스, 다크모드 스위치 등에 최적화되어 있습니다.
 * 
 * @param {boolean} initialValue - 초기값 (기본값: false)
 * @returns {[boolean, () => void]} [현재 상태, 상태 반전 함수]
 * 
 * @example
 * const [isModalOpen, toggleModal] = useToggle(false);
 * 
 * <button type="button" onClick={toggleModal}>
 *   모달 토글
 * </button>
 * 
 * {isModalOpen && <Modal />}
 */
export function useToggle(initialValue = false) {
  // 1. On/Off 상태 관리
  const [isToggle, setIsToggle] = useState(initialValue)

  // 2. 상태를 반전시키는 함수 (이전 상태를 기반으로 안전하게 업데이트)
  // useCallback을 사용하여 자식 컴포넌트에 프롭스로 전달될 때 불필요한 리렌더링을 방지합니다.
  const toggle = useCallback((value?: boolean) => {
    setIsToggle((prev) => value ?? !prev)
  }, [])

  // 3. 'as const'를 사용하여 반환되는 배열의 타입을 [boolean, function]으로 고정합니다.
  // 이를 통해 사용하는 쪽에서 구조 분해 할당 시 정확한 타입을 보장받습니다.
  return [isToggle, toggle] as const
}
