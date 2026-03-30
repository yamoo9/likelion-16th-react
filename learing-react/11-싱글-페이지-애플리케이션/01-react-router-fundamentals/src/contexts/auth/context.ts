import { createContext, use } from 'react'

interface User {
  email: string
}

export interface AuthContextValue {
  user: null | User
  isLoading: boolean
  login: (email: string) => void
  logout: () => void
}

export const AuthContext = createContext<null | AuthContextValue>(null)

export const useAuth = () => {
  const contextValue = use(AuthContext)
  
  if (!contextValue) {
    throw new Error('useAuth는 AuthContext 내부에서만 사용 가능합니다.')
  }

  return contextValue
}
