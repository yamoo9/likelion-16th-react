import { TOKEN } from '@/config/token'

// API 응답 타입
export interface ApiResponse<T> {
  data: T
  status: number
  message?: string
}

/**
 * [공통 API 호출 함수: fetchApi]
 * 모든 API 요청에서 반복되는 fetch 로직, 에러 처리, JSON 파싱을 한 곳에서 처리합니다.
 * 제네릭 <T>를 사용하여 호출하는 곳에서 반환 데이터의 타입을 지정할 수 있습니다.
 *
 * @template T - 서버로부터 받을 데이터의 타입
 * @param url - 요청할 API 엔드포인트 주소
 * @param options - fetch API의 옵션 (method, body, headers 등)
 *
 * @example
 * // 1. 인증이 필요한 데이터 조회 (GET)
 * interface UserProfile { id: string email: string }
 *
 * const getProfile = async () => {
 *   const response = await fetchApi<UserProfile>('/api/user/profile', {
 *     headers: getAuthHeaders(), // 인증 헤더 포함
 *   })
 *   console.log(response.data.email) // 타입 추론 지원
 * }
 *
 * @example
 * // 2. 데이터 생성 요청 (POST)
 * const createPost = async (postData: { title: string }) => {
 *   try {
 *     const result = await fetchApi<{ id: number }>('/api/posts', {
 *       method: 'POST',
 *       headers: getAuthHeaders(),
 *       body: JSON.stringify(postData),
 *     })
 *     if (result.status === 201) alert('생성 완료!')
 *   } catch (error) {
 *     alert('네트워크 오류가 발생했습니다.')
 *   }
 * }
 */
export async function fetchApi<T>(
  url: string,
  options?: RequestInit,
): Promise<ApiResponse<T>> {
  try {
    // 실제 네트워크 요청 수행
    const response = await fetch(url, options)

    // 응답 상태 코드가 200~299 범위가 아닐 경우 에러 발생
    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status}`)
    }

    // 서버로부터 받은 JSON 데이터를 자바스크립트 객체로 변환
    const data = await response.json()

    // 데이터와 상태 코드를 함께 반환하여 호출부에서 활용 가능하게 함
    return {
      data,
      status: response.status,
    }
  } catch (error) {
    // 네트워크 장애나 파싱 에러 등 예외 상황 로그 출력
    console.error('API 요청 중 오류 발생:', error)
    throw error // 에러를 상위(Service 레이어)로 던져서 후속 처리를 유도
  }
}

/**
 * [인증 헤더 생성 함수: getAuthHeaders]
 * 로컬 스토리지에 저장된 JWT 토큰을 꺼내어 HTTP 요청 헤더에 포함시킵니다.
 * 서버는 이 헤더의 'Authorization' 값을 보고 "누구의 요청인지" 판단합니다.
 *
 * @returns 'Content-Type'과 'Authorization'(토큰 존재 시)이 포함된 헤더 객체
 *
 * @example
 * // fetchApi와 조합하여 사용
 * const headers = getAuthHeaders()
 * // headers 결과 예시:
 * // { 'Content-Type': 'application/json', 'Authorization': 'Bearer eyJhbG...' }
 */
export function getAuthHeaders(): HeadersInit {
  // 로컬 스토리지에서 저장된 인증 토큰을 가져옴
  const refreshToken = localStorage.getItem(TOKEN)

  return {
    'Content-Type': 'application/json',
    ...(refreshToken ? { Authorization: `Bearer ${refreshToken}` } : {}),
  }
}
