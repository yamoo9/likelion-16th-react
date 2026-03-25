/**
 * [공통 API 요청 함수: request]
 * fetch API를 래핑하여 공통 헤더 설정, 에러 핸들링, 응답 파싱을 자동화합니다.
 * @template T - 서버로부터 받을 데이터의 타입
 */
export async function request<T>(url: string, options: RequestInit = {}) {

  // FormData 전송 시에는 Content-Type을 브라우저에 맡겨야 함
  const isFormData = options.body instanceof FormData;
  
  // 기본 헤더 설정 (JSON 통신을 기본으로 함)
  const defaultHeaders: Record<string, string> = isFormData 
    ? {} 
    : { 'Content-Type': 'application/json' };

  try {
    // 실제 네트워크 요청 수행
    // 기존 options.headers가 있다면 기본 헤더 위에 덮어씌워 유연성을 확보합니다.
    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    })

    /**
     * [특이 케이스 처리: 204 No Content]
     * 서버가 성공(200번대)을 알렸지만 보낼 데이터가 없는 경우(예: 삭제 성공),
     * 빈 본문에 .json()을 호출하면 문법 에러(SyntaxError)가 발생하므로 빈 객체를 반환합니다.
     */
    if (response.status === 204) {
      return {} as T
    }

    /**
     * [에러 상태 처리: !response.ok]
     * 상태 코드가 200~299 범위를 벗어난 경우 (400, 500번대 에러)
     */
    if (!response.ok) {
      // 서버가 보내준 상세 에러 메시지(예: { "message": "비밀번호 불일치" }) 파싱 시도
      const errorData = await response.json().catch(() => ({})) 
      
      // 서버 메시지가 있으면 사용하고, 없으면 기본 상태 코드 메시지 생성
      throw new Error(
        errorData.message ?? `API 요청 실패: 상태 코드(${response.status})`,
      )
    }

    // 성공 응답 파싱 (본문이 비어있을 경우를 대비해 catch 처리)
    return await response.json().catch(() => ({}) as T)

  } catch (error) {
    /**
     * [예외 로깅 및 전파]
     * AbortError: 사용자가 페이지를 이동하여 요청이 취소된 경우는 '정상적인 중단'이므로 로그를 남기지 않습니다.
     */
    if (error instanceof Error && error.name !== 'AbortError') {
      console.error('[네트워크 오류]:', error)
    }

    // 항상 Error 객체 형태로 통일하여 상위 호출부(Service/Component)로 던집니다.
    throw error instanceof Error
      ? error
      : new Error('알 수 없는 에러가 발생했습니다.')
  }
}
