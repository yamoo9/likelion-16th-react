export function throttle<T extends unknown[] = []>(callback: (...args: T) => void, delay = 400) {
  let id: number|undefined
  
  return (...args: T) => {
    if (!id) {
      id = setTimeout(() => {
        callback(...args)
        id = undefined
      }, delay)
    }
  }
}