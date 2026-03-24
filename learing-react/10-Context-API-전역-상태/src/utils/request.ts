export async function request<T>(url: string, options: RequestInit = {}) {
  // 기본 헤더 설정
  const defaultHeaders = {
    'Content-Type': 'application/json',
  }

  try {
    // fetch API를 사용하여 요청 전송
    // 기본 헤더와 사용자 지정 헤더를 병합
    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    })

    // 204 No Content 처리 (파싱 에러 방지)
    // 응답 본문이 없는 경우 빈 객체 반환
    if (response.status === 204) {
      return {} as T
    }

    // 응답 상태가 성공(2xx)이 아닌 경우 에러 처리
    if (!response.ok) {
      // 에러 응답 본문 파싱 시도
      const errorData = await response.json().catch(() => {})
      throw new Error(
        errorData.message ?? `API 요청 실패: 상태 코드(${response.status})`,
      )
    }

    // 성공적인 응답 본문을 파싱하여 반환
    return (await response.json()) as T
  } catch (error) {
    if (error instanceof Error && error.name !== 'AbortError') {
      // 모든 예외 상황 로깅 및 에러 전파
      console.error('[에러 발생]:', error)
    }
    throw error instanceof Error
      ? error
      : new Error('알 수 없는 에러가 발생했습니다.')
  }
}
