export interface User {
  id: string
  refreshToken: string
  email?: string
  name?: string
}

interface UserInfo {
  email: string
  name: string
}

export interface AuthContextType {
  user: User | null
  login: (id: string, password: string, userInfo?: UserInfo) => Promise<void>
  logout: () => void
}

/**
 * [응답 타입]
 * 
 * 참고: https://koreandummyjson.vercel.app/docs/auth
 */

export interface RequestInfo {
  id: string
  password: string
  ATExp?: number // accessToken의 만료 기간(s, 기본값: 1시간)
  RTExp?: number // RefreshToken의 만료 기간(s, 기본값: 24시간)
}

export type LoginInfo = Pick<RequestInfo, 'id' | 'password'>

export interface ResponseLoginData {
  message: string
  accessToken: string
  refreshToken: string
}

export type ResponseRefreshData = Omit<ResponseLoginData, 'refreshToken'>