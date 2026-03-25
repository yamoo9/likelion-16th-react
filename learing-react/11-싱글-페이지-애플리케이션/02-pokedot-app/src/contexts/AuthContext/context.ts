import { createContext, use } from 'react'
import type { AuthContextType } from './type'

/**
 * [인증 컨텍스트 객체 생성: AuthContext]
 * - 앱 전체에서 공유할 인증 상태(user, login, logout 등)의 저장소입니다.
 * - 초기값은 null로 설정하여, Provider 밖에서 사용되는 것을 방지합니다.
 */
export const AuthContext = createContext<AuthContextType | null>(null)

/**
 * [인증 상태 사용을 위한 커스텀 훅: useAuth]
 * - 컴포넌트 내부에서 인증 정보에 접근할 때 사용합니다.
 */
export const useAuth = (): AuthContextType => {
  const contextValue = use(AuthContext)

  /* 
    [안전 장치: Context 유효성 검사]
    - 만약 AuthProvider로 감싸지 않은 곳에서 이 훅을 호출하면 contextValue는 null이 됩니다.
    - 개발 단계에서 이 에러를 명시적으로 던져줌으로써 잘못된 사용을 즉시 방지합니다.
  */
  if (!contextValue) {
    throw new Error('useAuth 훅은 AuthProvider 내부에서만 사용 가능합니다.')
  }

  // null이 아님이 보장된(Type Guard) 인증 정보를 반환합니다.
  return contextValue
}