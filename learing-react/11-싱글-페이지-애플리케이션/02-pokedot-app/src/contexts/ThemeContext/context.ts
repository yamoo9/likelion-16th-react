import { createContext, use } from 'react'
import type { ThemeContextType } from './type'

/**
 * [테마 컨텍스트: ThemeContext]
 * 애플리케이션 전체의 테마 상태(다크/라이트 모드)를 공유하기 위한 저장소입니다.
 * 
 * - 초기값은 undefined이며, ThemeProvider를 통해 실제 상태와 제어 함수가 주입됩니다.
 */
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

/**
 * [커스텀 훅: useTheme]
 * 컴포넌트에서 현재 테마를 확인하거나 테마를 변경할 때 사용하는 인터페이스입니다.
 * 
 * @example
 * const { theme, setTheme, isDarkMode } = useTheme();
 * 
 * @returns {ThemeContextType} theme과 setTheme 함수, isDarkMode를 반환합니다.
 * @throws {Error} ThemeProvider 외부에서 사용 시 명확한 에러 메시지를 출력하여 디버깅을 돕습니다.
 */
export function useTheme() {
  // React 19의 'use' API를 사용하여 컨텍스트 값을 가져옵니다.
  const context = use(ThemeContext)
  
  // 안전 장치: 컨텍스트가 주입되지 않은 곳(Provider 밖)에서의 오용을 방지합니다.
  if (!context) {
    throw new Error('useTheme은 ThemeProvider 안에서만 사용 가능합니다.')
  }
  
  return context
}