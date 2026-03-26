/**
 * [사용자 정보 타입: User]
 * 서버로부터 받아오는 사용자 객체의 구조를 정의합니다.
 * 이 타입은 앱 전체에서 '현재 로그인한 유저'의 정보를 다룰 때 사용됩니다.
 */
export interface User {
  id: string           // 사용자의 고유 식별자
  refreshToken: string // API 요청 시 사용할 JWT 인증 토큰
}

/**
 * [인증 컨텍스트 타입: AuthContextType]
 * AuthProvider가 하위 컴포넌트들에게 공유하는 데이터와 함수의 규격입니다.
 * useAuth 훅을 사용할 때 이 타입의 가이드를 받게 됩니다.
 */
export interface AuthContextType {
  // 1. 상태 데이터 (State)
  user: User | null   // 로그인한 유저 정보 (로그아웃 상태면 null)
  isLoading: boolean  // 초기 인증 확인 중인지 여부 (로딩 스피너 표시에 활용)
  isAuthenticated: boolean // 로그인 여부를 판단하는 편리한 플래그 (true/false)

  // 2. 인증 액션 함수 (Actions)
  /**
   * @param username 사용자 아이디
   * @param password 사용자 비밀번호
   * @returns 성공 시 Promise가 완료되며, 실패 시 에러를 던집니다.
   */
  login: (id: string, password: string) => Promise<void>

  /**
   * 로그아웃을 수행하고 모든 인증 상태를 초기화합니다.
   */
  logout: () => Promise<void>
}