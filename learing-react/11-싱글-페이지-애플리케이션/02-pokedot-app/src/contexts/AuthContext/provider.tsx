import { useEffect, useState, useCallback, useMemo } from 'react'

import { TOKEN } from '@/config/token'
import { authApi } from '@/services/auth'
import { AuthContext } from './context'
import type { User } from './type'

type Props = React.PropsWithChildren

/**
 * [인증 상태 관리: AuthProvider]
 * 앱 전체의 로그인 상태를 관리하고, 하위 컴포넌트들이 인증 기능을 사용할 수 있게 돕습니다.
 */
export function AuthProvider({ children }: Props) {
  // 현재 로그인한 사용자 정보 (아이디와 인증 토큰 포함)
  const [user, setUser] = useState<User | null>(null)

  // 앱 초기 가동 시 인증 상태를 확인하는 중인지 나타내는 상태
  const [isLoading, setIsLoading] = useState(true)

  /**
   * [자동 로그인 확인]
   * 앱이 처음 실행될 때 로컬 스토리지의 토큰을 확인하여 로그인을 유지합니다.
   */
  useEffect(() => {
    setIsLoading(true)

    const checkAuth = async () => {
      try {
        // 로컬 스토리지에 저자된 리프레시 토큰을 가져옵니다.
        const refreshToken = localStorage.getItem(TOKEN)
        
        // 저장된 리프레시 토큰이 없다면 바로 종료합니다.
        if (!refreshToken) return

        // API 서버로부터 인증 사용자 정보를 가져옵니다.
        // (authApi.getCurrentUser 내부에서 토큰 갱신 로직 실행)
        const userData = await authApi.getCurrentUser()
        
        if (userData) {
          // User 인터페이스 규격에 맞춰 id와 refreshToken을 모두 저장합니다.
          setUser({ 
            id: userData.userId,
            refreshToken,
          })
        }
      } catch (error) {
        console.error('인증 상태 복구 실패:', error)
        // 에러 발생 시 안전하게 사용자 상태를 초기화합니다.
        setUser(null)
      } finally {
        // 성공/실패 여부와 상관없이 초기 확인이 끝나면 로딩을 해제합니다.
        setIsLoading(false)
      }
    }

    checkAuth()
  }, []) // 앱 마운트 시 딱 한 번만 실행

  /**
   * [로그인 처리]
   * 아이디와 비밀번호로 로그인을 시도하고, 성공 시 유저 상태를 업데이트합니다.
   */
  const login = useCallback(async (id: string, password: string) => {
    setIsLoading(true)

    try {
      // API 서버에 사용자 입력 정보로 로그인을 요청합니다.
      const response = await authApi.login({ id, password })
      
      // API 서버에서 받은 리프레시 토큰을 로컬 스토리지에 저장합니다.
      const { refreshToken } = response
      localStorage.setItem(TOKEN, refreshToken)
      
      // 전역 user 상태에 아이디와 토큰 정보를 기록합니다.
      setUser({ id, refreshToken }) 
    } catch (error) {
      console.error('로그인 처리 중 오류:', error)
      throw error // UI 컴포넌트에서 에러 처리를 할 수 있게 던져줍니다.
    } finally {
      setIsLoading(false)
    }
  }, [])

  /**
   * [로그아웃 처리]
   * 서버와의 연결을 정리하고 브라우저의 모든 인증 정보를 삭제합니다.
   */
  const logout = useCallback(async () => {
    try {
      // API 호출을 통해 서버 측 세션을 정리하고 로컬 데이터를 지웁니다.
      await authApi.logout()
    } finally {
      // 통신 성공 여부와 관계없이 클라이언트 상태는 초기화합니다.
      setUser(null)
    }
  }, [])

  /**
   * [컨텍스트 공급 값]
   * 하위 컴포넌트에서 useAuth 등을 통해 접근할 데이터와 함수들입니다.
   */
  const value = useMemo(
    () => ({
      user,
      isLoading,
      login,
      logout,
      isAuthenticated: !!user, // 유저 정보 존재 여부로 로그인 상태를 판단합니다.
    }),
    [user, isLoading, login, logout],
  )

  return <AuthContext value={value}>{children}</AuthContext>
}