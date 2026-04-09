/**
 * [유틸리티 함수: debounce]
 * 연속으로 호출되는 함수들 중 마지막 호출만 일정 시간(delay) 뒤에 실행하도록 합니다.
 * 리액트 외부나, useEffect 내에서 직접 함수를 생성할 때 유용합니다.
 * 
 * @template T - 콜백 함수가 받는 인자들의 타입 (배열 형태)
 * @param callback - 실행할 실제 로직
 * @param delay - 대기 시간 (기본값: 400ms)
 * 
 * @returns 디바운싱된 함수와 타이머를 강제로 취소하는 .clear() 메서드를 반환합니다.
 * 
 * @example
 * // 1. 단순 검색 입력 최적화
 * const handleSearch = debounce((query: string) => {
 *   console.log('API 요청:', query)
 * }, 500)
 * 
 * // 사용자가 타이핑할 때마다 호출되지만, 마지막 입력 500ms 후에 한 번만 실행됨
 * <input type="text" onChange={(e) => handleSearch(e.target.value)} />
 * 
 * @example
 * // 2. 리액트 useEffect 내에서의 사용 및 정리(Cleanup)
 * useEffect(() => {
 *   const debouncedLog = debounce(() => console.log('Resize 이벤트!'), 300)
 *   window.addEventListener('resize', debouncedLog)
 *   
 *   return () => {
 *     debouncedLog.clear() // 언마운트 시 예약된 실행 취소
 *     window.removeEventListener('resize', debouncedLog)
 *   }
 * }, [])
 */
export function debounce<T extends unknown[] = []>(
  callback: (...args: T) => void,
  delay: number = 400,
): ((...args: T) => void) & { clear: () => void } {
  // 1. 실행 대기 중인 타이머의 ID를 클로저(Closure) 공간에 저장합니다.
  let debounceId: ReturnType<typeof setTimeout> | undefined

  // 2. 실제 호출될 디바운싱 함수
  const debounced = (...args: T) => {
    // 이미 예약된 실행이 있다면 취소합니다 (마지막 호출만 살리기 위함)
    if (debounceId) {
      clearTimeout(debounceId)
    }

    // 새로운 실행을 예약합니다.
    debounceId = setTimeout(() => {
      callback(...args)
      debounceId = undefined // 실행 완료 후 ID 초기화
    }, delay)
  }

  /** 
   * [추가 메서드: clear]
   * 컴포넌트 언마운트 시점 등에서 예약된 작업을 강제로 취소할 때 사용합니다.
   */
  debounced.clear = () => {
    if (debounceId) {
      clearTimeout(debounceId)
      debounceId = undefined
    }
  }

  return debounced
}