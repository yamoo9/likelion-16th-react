import { useSyncExternalStore } from 'react'

// 클라이언트 사이드인지 확인하는 헬퍼 함수
const emptySubscribe = () => () => {}

export function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true, // 클라이언트 사이드 값
    () => false, // 서버 사이드 값 (초기값)
  )
}
