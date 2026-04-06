import { useEffect, useRef, useState } from 'react'

/**
 * [커스텀 훅: useThrottle]
 * 짧은 시간 동안 반복되는 이벤트(예: 스크롤, 마우스 이동)를 
 * 설정된 delay 시간마다 최대 한 번만 실행되도록 제한합니다.
 * 
 * @template T - 쓰로틀링할 값의 타입
 * @param {T} initialValue - 실시간으로 변경되는 입력 값
 * @param {number} delay - 실행 주기 (기본값: 300ms)
 * 
 * @example
 * const [scrollPos, setScrollPos] = useState(0);
 * const [throttledScroll] = useThrottle(scrollPos, 500);
 * 
 * // 0.5초마다 현재 스크롤 위치를 기반으로 무거운 로직 실행
 * useEffect(() => { console.log(throttledScroll) }, [throttledScroll]);
 * 
 * @returns {[T, React.Dispatch<React.SetStateAction<T>>]} 
 * 쓰로틀링된 값과 해당 값을 강제로 업데이트할 수 있는 setter 함수를 반환합니다.
 */
export function useThrottle<T>(
  initialValue: T,
  delay = 300,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  // 실제로 화면이나 로직에 반영될 쓰로틀링된 상태
  const [throttleValue, setThrottleValue] = useState(initialValue)

  // 최신 입력값을 기억하기 위한 Ref (타이머 실행 시점의 최신값 참조용)
  const lastValueRef = useRef(initialValue)
  
  // 현재 쓰로틀링(대기 시간) 중인지 여부를 관리하는 플래그
  const isThrottlingRef = useRef(false)

  useEffect(() => {
    // 매 렌더링마다 들어오는 최신값을 Ref에 업데이트
    lastValueRef.current = initialValue

    // 이미 쓰로틀링 중(타이머 작동 중)이라면 아무것도 하지 않고 대기
    if (isThrottlingRef.current) return

    // 쓰로틀링 시작! (문 잠그기)
    isThrottlingRef.current = true

    // 설정된 delay가 지나면 실행
    const timerId = setTimeout(() => {
      // 타이머가 끝나는 시점의 '가장 최신 값'으로 상태 업데이트
      setThrottleValue(lastValueRef.current)
      
      // 쓰로틀링 종료 (문 열기 - 다음 입력을 받을 준비 완료)
      isThrottlingRef.current = false
    }, delay)

    // 클린업: 컴포넌트 언마운트 시 타이머 제거
    return () => clearTimeout(timerId)
  }, [initialValue, delay])

  return [throttleValue, setThrottleValue]
}
