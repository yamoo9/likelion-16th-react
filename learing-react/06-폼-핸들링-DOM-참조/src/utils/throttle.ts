export function throttle<T extends unknown[] = []>(
  callback: (...args: T) => void,
  delay = 400,
) {
  let lastRunTime = 0
  let timeoutId: ReturnType<typeof setTimeout> | undefined

  const throttled = (...args: T) => {
    const now = performance.now()
    const remaining = delay - (now - lastRunTime)

    if (remaining <= 0) {
      if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = undefined
      }
      lastRunTime = now
      callback(...args)
    } else if (!timeoutId) {
      timeoutId = setTimeout(() => {
        lastRunTime = performance.now()
        timeoutId = undefined
        callback(...args)
      }, remaining)
    }
  }

  throttled.clear = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = undefined
    }
    lastRunTime = 0
  }

  return throttled
}
