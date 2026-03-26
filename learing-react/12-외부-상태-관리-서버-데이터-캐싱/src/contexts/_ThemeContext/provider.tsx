import { useState, useSyncExternalStore, useEffect, useCallback } from 'react'
import { THEME_KEY } from '@/config/theme'
import { ThemeContext } from './context'
import type { Theme } from './type'

// DOM 조작을 위한 루트 요소와 시스템 테마 감지를 위한 미디어 쿼리 객체
const rootElement = document.documentElement
const darkMediaQuery = matchMedia('(prefers-color-scheme: dark)')

/**
 * [외부 시스템 구독 함수]
 * 리액트 외부의 상태(브라우저 시스템 테마) 변화를 리액트 엔진에 알립니다.
 */
const subscribeSystemTheme = (callback: () => void) => {
  darkMediaQuery.addEventListener('change', callback)
  return () => darkMediaQuery.removeEventListener('change', callback)
}

/**
 * [시스템 테마 스냅샷]
 * 현재 브라우저의 다크모드 활성화 여부를 즉시 반환합니다.
 */
const getSystemThemeSnapshot = () => darkMediaQuery.matches

export function ThemeProvider({ children }: React.PropsWithChildren) {
  /* 사용자가 선택한 테마 상태 (Lazy Initialization) */
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem(THEME_KEY)
    return saved ? (JSON.parse(saved) as Theme) : 'system'
  })

  /* 시스템 테마 실시간 구독 (React 18+ 최적화) */
  // useEffect 없이도 외부 시스템의 변화에 따라 컴포넌트를 재렌더링합니다.
  const isSystemDark = useSyncExternalStore(
    subscribeSystemTheme,
    getSystemThemeSnapshot
  )

  /* 파생된 상태 계산 (Derived State) */
  // 별도의 상태 저장 없이 기존 상태들을 조합해 실시간으로 계산합니다.
  const isDarkMode = theme === 'system' ? isSystemDark : theme === 'dark'
  const resolvedTheme = isDarkMode ? 'dark' : 'light'

  /* 부수 효과 처리 (Side Effects) */
  // DOM 조작 및 로컬 스토리지 저장은 렌더링 순수성을 위해 이펙트에서 처리합니다.
  useEffect(() => {
    // 시스템 UI(스크롤바 등)와 CSS 테마 속성 반영
    rootElement.style.setProperty('color-scheme', resolvedTheme)
    rootElement.dataset.theme = resolvedTheme
    
    // 사용자 설정 영구 저장
    localStorage.setItem(THEME_KEY, JSON.stringify(theme))
  }, [theme, resolvedTheme])

  /* 컨텍스트 값 최적화 */
  // 하위 컴포넌트의 불필요한 재렌더링을 방지하기 위해 함수 참조를 고정합니다.
  const setTheme = useCallback((nextTheme: Theme) => {
    setThemeState(nextTheme)
  }, [])

  return (
    <ThemeContext value={{ theme, setTheme, isDarkMode }}>
      {children}
    </ThemeContext>
  )
}