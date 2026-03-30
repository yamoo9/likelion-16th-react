import { createContext, use } from 'react'

export interface User {
  email: string
}

export interface AuthContextValue {
  // state
  user: null | User
  isLoading: boolean
  // actions
  login: (email: User['email']) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<null | AuthContextValue>(null)

export const useAuth = () => {
  const contextValue = use(AuthContext) // React v19+ use() 함수

  if (!contextValue) {
    throw new Error('useAuth는 AuthProvider 내부에서만 사용 가능합니다.')
  }

  return contextValue
}
