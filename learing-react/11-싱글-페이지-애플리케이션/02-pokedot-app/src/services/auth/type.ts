/**
 * [로그인 요청 데이터: LoginRequest]
 * 사용자가 로그인 폼에 입력하여 서버로 보내는 정보입니다.
 */
export interface LoginRequest {
  id: string        // 사용자가 입력한 아이디 (예: 'user123')
  password: string  // 사용자가 입력한 비밀번호
}

/**
 * [로그인 성공 응답: LoginResponse]
 * 아이디/비밀번호가 일치할 때 서버가 보내주는 데이터입니다.
 * 인증을 위한 두 종류의 토큰(Access, Refresh)이 포함됩니다.
 */
export interface LoginResponse {
  message: string      // 서버의 응답 메시지 (예: '로그인 성공')
  accessToken: string  // API 요청 시 헤더에 실어 보낼 단기 인증 토큰
  refreshToken: string // 액세스 토큰이 만료되었을 때 재발급받기 위한 장기 토큰
}

/**
 * [토큰 재발급 응답: RefreshTokenResponse]
 * 기존 리프레시 토큰을 서버에 보내어 새로운 액세스 토큰을 받았을 때의 구조입니다.
 */
export interface RefreshTokenResponse {
  message: string      // 응답 메시지
  accessToken: string  // 새로 발급된 따끈따끈한 인증 토큰
}

/**
 * [현재 사용자 정보 응답: ReadCurrentUserResponse]
 * 토큰을 통해 서버가 '이 토큰의 주인은 누구인가'를 확인해준 결과입니다.
 * 주로 앱 상단에 사용자 아이디를 표시하거나 권한을 확인할 때 사용합니다.
 */
export interface ReadCurrentUserResponse {
  message: string      // 응답 메시지
  userId: string       // 서버에서 확인된 실제 사용자의 고유 아이디
}
