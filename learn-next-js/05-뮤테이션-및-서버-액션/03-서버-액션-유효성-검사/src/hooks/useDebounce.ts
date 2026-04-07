import { useState, useEffect } from 'react'

/**
 * [커스텀 훅: useDebounce]
 * 연속적으로 발생하는 이벤트(예: 키보드 입력) 중 마지막 이벤트가 발생하고 
 * 일정 시간이 지난 뒤에만 상태를 업데이트하여 성능을 최적화합니다.
 * 
 * @template T - 디바운싱할 값의 타입
 * @param {T} value - 실시간으로 변경되는 입력 값
 * @param {number} delay - 대기 시간 (기본값: 300ms)
 * 
 * @example
 * const [searchTerm, setSearchTerm] = useState('')
 * const [debouncedSearch] = useDebounce(searchTerm, 500)
 * 
 * // debouncedSearch는 사용자가 입력을 멈추고 0.5초 뒤에 업데이트됩니다.
 * useEffect(() => { fetchApi(debouncedSearch) }, [debouncedSearch])
 * 
 * @returns {[T, React.Dispatch<React.SetStateAction<T>>]} 
 * 디바운싱된 값과 해당 값을 강제로 업데이트할 수 있는 setter 함수를 반환합니다.
 */
export function useDebounce<T>(
  value: T,
  delay: number = 300,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  // 1. 내부적으로 지연된 값을 관리할 상태를 선언합니다.
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    // 2. 설정된 delay 시간이 지나면 debouncedValue를 현재 value로 업데이트합니다.
    const timerId = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // 3. 클린업 함수: value나 delay가 변경되면 이전 타이머를 취소합니다.
    // 이를 통해 연속적인 입력이 들어오면 이전 타이머는 계속 취소되고 마지막 타이머만 실행됩니다.
    return () => {
      clearTimeout(timerId)
    }
  }, [value, delay])

  return [debouncedValue, setDebouncedValue]
}
