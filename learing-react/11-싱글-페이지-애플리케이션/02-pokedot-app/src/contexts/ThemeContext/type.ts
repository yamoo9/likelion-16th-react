/**
 * [테마 타입: Theme]
 * 애플리케이션에서 지원하는 테마 모드입니다.
 * - 'light': 밝은 모드 강제 적용
 * - 'dark': 어두운 모드 강제 적용
 * - 'system': 사용자의 OS(운영체제) 설정에 따라 자동으로 변경
 */
export type Theme = 'light' | 'dark' | 'system'

/**
 * [테마 옵션 인터페이스: ThemeOption]
 * 테마 선택 UI(드롭다운, 버튼 등)를 렌더링할 때 필요한 데이터 구조입니다.
 * readonly를 사용하여 데이터의 불변성을 보장합니다.
 */
export interface ThemeOption {
  readonly id: Theme                 // 테마 식별자
  readonly label: string             // 화면에 표시될 이름 (예: '라이트', '다크', '시스템 설정')
  readonly icon: React.ReactElement  // 각 테마를 상징하는 아이콘 컴포넌트
}

/**
 * [테마 컨텍스트 인터페이스: ThemeContextType]
 * ThemeProvider를 통해 하위 컴포넌트에 제공될 상태와 함수들의 규격입니다.
 */
export interface ThemeContextType {
  theme: Theme                       // 현재 설정된 테마 모드
  setTheme: (theme: Theme) => void   // 테마를 변경하는 함수
  isDarkMode: boolean                // 현재 실제로 다크 모드가 활성화되었는지 여부 (계산된 값)
}