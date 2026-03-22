export function debounce<T extends unknown[] = []>(
  callback: (...args: T) => void,
  delay = 400,
) {
  let debounceId: ReturnType<typeof setTimeout> | undefined

  const debounced = (...args: T) => {
    clearTimeout(debounceId)
    debounceId = setTimeout(() => {
      callback(...args)
      debounceId = undefined
    }, delay)
  }

  debounced.clear = () => {
    if (debounceId) clearTimeout(debounceId)
  }

  return debounced
}
