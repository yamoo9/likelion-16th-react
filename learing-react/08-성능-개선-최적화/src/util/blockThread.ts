/**
 * [학습용] 메인 스레드를 강제로 점유하여 성능 저하를 시뮬레이션합니다.  
 * 리액트의 렌더링 최적화(memo, useMemo) 효과를 테스트할 때 사용하세요.
 * @param ms 지연 시간 (밀리초, 기본값 100ms)
 */
export function blockThread(ms: number = 100): void {
  const safeMs = Math.min(ms, 5000)
  const startTime = performance.now()
  while (performance.now() - startTime < safeMs) continue
}

export function getExpensiveValue(count: number, min = 300, max = 400) {
  const expensiveValue = Math.floor(Math.random() * (max - min + 1) + min) * Math.min(3, count)
  blockThread(expensiveValue)
  return expensiveValue
}

export const getFibonacci = (n: number): number => {
  if (n <= 1) return n
  return getFibonacci(n - 1) + getFibonacci(n - 2)
}

export const computedTime = (calcCallback: () =>  void): number => {
  const startTime = performance.now()
  calcCallback?.()
  const endTime = performance.now() - startTime
  return endTime
}