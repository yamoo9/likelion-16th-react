/**
 * [성능 최적화: 쓰로틀(Throttle)]
 * 빈번하게 발생하는 이벤트를 가로채어, 설정한 지연 시간(delay)마다 최대 한 번만 실행되도록 제한합니다.
 */
export function throttle<T extends unknown[] = []>(
  callback: (...args: T) => void,
  delay = 400,
) {
  let lastRunTime = 0 // 마지막으로 함수가 실행된 시점
  let timeoutId: ReturnType<typeof setTimeout> | undefined // 지연 실행을 위한 타이머 ID

  const throttled = (...args: T) => {
    const now = performance.now() // 현재 정밀 시간
    const remaining = delay - (now - lastRunTime) // 다음 실행까지 남은 시간 계산

    // 실행 주기(delay)가 지났거나, 처음 실행하는 경우 즉시 실행
    if (remaining <= 0) {
      // 예약된 타이머가 있다면 취소 (즉시 실행이 우선순위)
      if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = undefined
      }
      lastRunTime = now
      callback(...args)
    } 
    // 아직 실행 주기가 돌아오지 않았지만, 대기 중인 예약(timeoutId)이 없는 경우
    // 마지막 호출이 무시되지 않도록 '남은 시간' 뒤에 실행되도록 예약합니다.
    else if (!timeoutId) {
      timeoutId = setTimeout(() => {
        lastRunTime = performance.now()
        timeoutId = undefined
        callback(...args)
      }, remaining)
    }
  }

  // [확장] 컴포넌트 언마운트 시 혹은 초기화가 필요할 때 타이머를 제거합니다.
  throttled.clear = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = undefined
    }
    lastRunTime = 0
  }

  return throttled
}
