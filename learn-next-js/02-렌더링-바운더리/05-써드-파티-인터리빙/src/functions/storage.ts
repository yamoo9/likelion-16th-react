
// 클라이언트 전용 함수 (window는 서버에 없음)
export const getStorage = (key: string) => {
  const data = window.localStorage.getItem(key)
  if (!data) return null
  return JSON.parse(data)
}

export const setStorage = <T>(key: string, value: T) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}