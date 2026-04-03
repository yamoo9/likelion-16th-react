import 'client-only'

export const getStorage = (key: string) => {
  const data = globalThis.localStorage.getItem(key)
  if (!data) return null
  return JSON.parse(data)
}

export const setStorage = <T>(key: string, value: T) => {
  globalThis.localStorage.setItem(key, JSON.stringify(value))
}