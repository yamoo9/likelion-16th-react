import { useCallback, useState } from 'react'

import type { AuthContextType } from './type'
import { login as authLogin } from './api'
import { AuthContext } from './context'

export function AuthProvider({ children }: React.PropsWithChildren) {
  const [user, setUser] = useState<AuthContextType['user']>(null)

  const login: AuthContextType['login'] = useCallback(async (id, password, userInfo) => {
    try {
      const { accessToken, refreshToken } = await authLogin({ id, password })
      const authUser = { id, accessToken, refreshToken, ...userInfo }
      setUser(authUser)

      console.log('로그인 성공:', authUser)
    } catch (error) {
      console.error('로그인 실패:', error)
      throw error
    }
  }, [])

  const logout: AuthContextType['logout'] = useCallback(() => {
    setUser(null)

    console.log('로그아웃 완료')
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}