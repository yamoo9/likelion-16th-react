import { TOKEN } from '@/config/token'
import { fetchApi, getAuthHeaders, wait } from '@/utils'
import type { LoginRequest, LoginResponse, ReadCurrentUserResponse, RefreshTokenResponse } from './type'
import { USER_ID } from '@/config/userId'

// 환경 변수에서 인증 서버의 기본 URL을 가져옵니다.
const AUTH_API_BASE_URL = import.meta.env.VITE_AUTH_API_BASE_URL

/**
 * [인증 관련 API 서비스 객체: authApi]
 * 로그인, 로그아웃, 현재 사용자 확인 등 인증과 관련된 모든 서버 통신을 담당합니다.
 */
export const authApi = {
  /**
   * 리프레시 토큰으로 사용자 정보 갱신
   * 앱이 새로고침되거나 처음 로드될 때 실행됨
   */
  refreshToken: async (): Promise<RefreshTokenResponse | null> => {
    const refreshToken = localStorage.getItem(TOKEN)
    if (!refreshToken) return null

    try {
      const response = await fetchApi<RefreshTokenResponse>(
        `${AUTH_API_BASE_URL}/api/auth/refresh`,
        {
          method: 'GET', // 일반적으로 POST이나, API에서 GET으로 요청해야 한다고 안내함
          headers: getAuthHeaders(), // 인증 헤더에 토큰을 실어 보냄
        },
      )
      return response.data
    } catch (error) {
      console.error('[인증 갱신 실패]', error)
      // [클린업]: 갱신 실패 시 유효하지 않은 토큰 제거
      authApi.clearLocalAuthData()
      return null
    }
  },

  /**
   * [현재 사용자 정보 가져오기: getCurrentUser]
   * - 앱이 새로고침되거나 처음 로드될 때, 저장된 토큰이 유효한지 서버에 확인합니다.
   * - 토큰이 없거나 서버에서 에러가 발생하면(만료 등) 토큰을 삭제하고 null을 반환합니다.
   */
  getCurrentUser: async (): Promise<ReadCurrentUserResponse | null> => {
    const refreshToken = localStorage.getItem(TOKEN)
    // 저장된 토큰이 없으면 서버에 물어볼 필요 없이 바로 null 반환
    if (!refreshToken) return null

    try {
      // 먼저 토큰 갱신 시도 (유효성 검사 겸용)
      const authInfo = await authApi.refreshToken()
      if (!authInfo) return null

      // 발급받은 accessToken으로 유저 정보 요청
      const response = await fetchApi<ReadCurrentUserResponse>(
        `${AUTH_API_BASE_URL}/api/auth/user`,
        {
          headers: {
            Authorization: `Bearer ${authInfo.accessToken}`, // 인증 헤더에 토큰을 실어 보냄
          },
        }, 
      )
      return response.data
    } catch(error) {
      console.error('[사용자 정보 조회 실패]', error)
      // [클린업] 통신 에러나 401 발생 시 토큰 정리
      authApi.clearLocalAuthData()
      return null
    }
  },

  /**
   * [로그인 요청: login]
   * - 사용자가 입력한 아이디/비밀번호를 서버에 POST 방식으로 전송합니다.
   * - 성공 시 서버로부터 유저 정보와 JWT 토큰을 포함한 응답을 받습니다.
   */
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await fetchApi<LoginResponse>(
      `${AUTH_API_BASE_URL}/api/auth/login`,
      {
        method: 'POST', // 데이터 생성을 위한 POST 메서드 사용
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...credentials,
          ATExp: 60 * 60, // accessToken 만료 시간: 1시간
          RTExp: 60 * 60 * 24, // refreshToken 만료 시간: 24시간
        }), // 객체를 JSON 문자열로 변환하여 전송
      },
    )

    // 로그인 성공 시에만 사용자 아이디 저장
    localStorage.setItem(USER_ID, credentials.id)

    // 호출부(AuthProvider)에서 토큰 저장 처리를 할 수 있도록 데이터 반환
    return response.data
  },

  /**
   * [로그아웃: logout]
   * - 클라이언트 측에서 인증 토큰을 즉시 삭제하여 로그아웃 상태로 만듭니다.
   */
  logout: async (): Promise<void> => {
    await wait(600) // UX를 위한 지연
    // [클린업]: 로컬 인증 정보 완전 삭제
    authApi.clearLocalAuthData()
  },

  /**
   * 로그아웃 및 데이터 정리 전용 메서드
   */
  clearLocalAuthData: () => {
    localStorage.removeItem(TOKEN)
    localStorage.removeItem(USER_ID)
  },
}
