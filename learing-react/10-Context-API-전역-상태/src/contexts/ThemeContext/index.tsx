import { createContext, useCallback, useContext, useState } from 'react'

type ThemeMode = 'light' | 'dark'

interface ColorScheme {
  textColor: string
  backgroundColor: string
}

interface ThemeContextValue {
  mode: ThemeMode
  scheme: ColorScheme
  toggle: () => void
}

const COLOR_SCHEME: Record<ThemeMode, ColorScheme> = {
  light: {
    textColor: '#010101',
    backgroundColor: '#efefef',
  },
  dark: {
    textColor: '#efefef',
    backgroundColor: '#010101',
  },
}

// 테마 컨텍스트 객체
const ThemeContext = createContext<ThemeContextValue | null>(null)

// 테마 프로바이더 래퍼 컴포넌트
export function ThemeProvider(props: React.PropsWithChildren) {
  const [themeMode, setThemeMode] = useState<ThemeMode>('light')

  const toggleTheme = useCallback(() => {
    setThemeMode((m) => (m === 'light' ? 'dark' : 'light'))
  }, [])

  const colorScheme = COLOR_SCHEME[themeMode]

  console.log({themeMode, colorScheme})

  const themeValue = {
    mode: themeMode,
    scheme: colorScheme,
    toggle: toggleTheme,
  } as ThemeContextValue

  return <ThemeContext.Provider value={themeValue} {...props} />
}

// 테마 컨텍스트 값을 가져오는 커스텀 훅 (컨텍스트 전용 훅)
// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const themeContextValue = useContext(ThemeContext)

  if (!themeContextValue) {
    throw new Error('useTheme 훅은 ThemeProvider 안에서만 사용해야 합니다.')
  }

  return themeContextValue
}