/**
 * [성능 최적화: 쓰로틀(Throttle)]
 * 빈번하게 발생하는 이벤트를 가로채어, 설정한 지연 시간(delay)마다 최대 한 번만 실행되도록 제한합니다.
 * 스크롤, 마우스 이동, 창 크기 조절 등 짧은 시간 내 수백 번 발생하는 이벤트 처리에 적합합니다.
 *
 * @template T - 콜백 함수가 받는 인자들의 타입 (배열 형태)
 * @param callback - 실행할 실제 로직
 * @param delay - 실행 간격 (기본값: 400ms)
 *
 * @returns 쓰로틀링된 함수와 타이머를 강제로 취소하는 .clear() 메서드를 반환합니다.
 *
 * @example
 * // 1. 스크롤 위치 감지 최적화
 * const handleScroll = throttle(() => {
 *   console.log('현재 스크롤 위치:', globalThis.scrollY)
 * }, 200)
 *
 * globalThis.addEventListener('scroll', handleScroll)
 *
 * @example
 * // 2. 무한 스크롤(Infinite Scroll) 로직 적용
 * const loadMore = throttle(async () => {
 *   if (globalThis.innerHeight + globalThis.scrollY >= document.body.offsetHeight - 500) {
 *     await fetchNextPage()
 *   }
 * }, 500)
 *
 * @example
 * // 3. 리액트 useEffect 내에서의 사용 및 정리(Cleanup)
 * useEffect(() => {
 *   const throttledResize = throttle(() => {
 *     console.log('창 크기 변경 중...')
 *   }, 400)
 *
 *   globalThis.addEventListener('resize', throttledResize)
 *   return () => throttledResize.clear() // 언마운트 시 타이머 제거 및 초기화
 * }, [])
 */
export function throttle<T extends unknown[] = []>(
  callback: (...args: T) => void,
  delay = 400,
): ((...args: T) => void) & { clear: () => void } {
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
