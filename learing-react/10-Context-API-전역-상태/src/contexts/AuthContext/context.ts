import { createContext, useContext } from 'react'
import type { AuthContextType } from './type'

/**
 * 인증 컨텍스트
 */
export const AuthContext = createContext<AuthContextType | null>(null)

/**
 * 인증 커스텀 훅 (함수)
 *
 * @example
 *
 * const { login } = useAuth()
 *
 * <button
 *   type="button"
 *   onClick={() => login(email, password)}
 * >
 *   회원가입
 * </button>
 */
export const useAuth = () => {
  const contextValue = useContext(AuthContext)

  if (!contextValue) {
    throw new Error('useAuth 훅은 AuthProvider 내부에서만 사용 가능합니다.')
  }

  return contextValue
}
