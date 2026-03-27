import { request } from '@/utils/request'
import type {
  LoginInfo,
  RequestInfo,
  ResponseLoginData,
  ResponseRefreshData,
} from './type'

const BASE_API_URL = import.meta.env.VITE_API_URL
const AUTH_AUTH_URL = `${BASE_API_URL}/api/auth`

/**
 * [로그인]
 * 사용자 정보를 받아 액세스/리프레시 토큰을 발급받습니다.
 * 
 * 참고: https://koreandummyjson.vercel.app/docs/auth
 */
export const login = async ({ id, password }: LoginInfo) => {
  const requestInfo: RequestInfo = {
    id,
    password,
    ATExp: 60 * 60,
    RTExp: 60 * 60 * 24,
  }

  return request<ResponseLoginData>(`${AUTH_AUTH_URL}/login`, {
    method: 'POST',
    body: JSON.stringify(requestInfo),
  })
}

/**
 * [토큰 재발급]
 * 저장된 리프레시 토큰을 사용하여 새로운 액세스 토큰을 요청합니다.
 *
 * 참고: https://koreandummyjson.vercel.app/docs/auth
 */
export const refreshToken = async (token: string) => {
  return request<ResponseRefreshData>(`${AUTH_AUTH_URL}/refresh`, {
    method: 'GET', // API 문서 참고 ('POST' 메서드가 더 안전)
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
