/**
 * HTTP 상태 코드별 한글 메시지 매핑
 * @param {number} status - HTTP 상태 코드
 * @param {string} defaultMessage - 기본 에러 메시지
 */
export const getErrorMessage = (status?: number, defaultMessage?: string) => {
  switch (status) {
    // 4xx: 클라이언트 오류
    case 400:
      return '잘못된 요청입니다. 입력 내용을 확인해주세요.'
    case 401:
      return '로그인이 필요한 서비스입니다.'
    case 403:
      return '접근 권한이 없습니다.'
    case 404:
      return '요청하신 정보를 찾을 수 없습니다.'
    case 405:
      return '허용되지 않는 요청 방법입니다.'
    case 408:
      return '요청 시간이 초과되었습니다. 다시 시도해주세요.'
    case 409:
      return '이미 존재하는 정보이거나 데이터가 충돌했습니다.'
    case 429:
      return '너무 많은 요청이 발생했습니다. 잠시 후 다시 시도해주세요.'

    // 5xx: 서버 오류
    case 500:
      return '서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
    case 502:
      return '서버로의 연결이 원활하지 않습니다.'
    case 503:
      return '현재 서버 점검 중이거나 일시적인 과부하 상태입니다.'
    case 504:
      return '서버 응답 시간이 초과되었습니다.'

    // 기타 (네트워크 연결 등)
    case 0:
      return '네트워크 연결이 불안정합니다. 연결 상태를 확인해주세요.'

    default:
      return (defaultMessage ?? '알 수 없는 오류가 발생했습니다. 관리자에게 문의하세요.')
  }
}
