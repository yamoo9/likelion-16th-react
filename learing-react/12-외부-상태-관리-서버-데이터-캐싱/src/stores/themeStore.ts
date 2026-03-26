import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'
import { immer } from 'zustand/middleware/immer'
import { devtools } from 'zustand/middleware'

import { THEME_KEY } from '@/config/theme'

/** 테마 타입 정의 */
export type Theme = 'light' | 'dark' | 'system'

interface ThemeState {
  
  // 상태 (State)
  theme: Theme
  isDarkMode: boolean
  
  // 액션 (Actions)
  setTheme: (theme: Theme) => void
  syncSystemTheme: () => void // 시스템 테마 변경 시 호출되어 내부 상태를 동기화 (비공개)
}

const rootElement = document.documentElement
const darkMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

/**
 * DOM 속성 변경 및 로컬 스토리지 저장을 수행합니다.
 */
const applyTheme = (theme: Theme, isDark: boolean) => {
  const resolved = isDark ? 'dark' : 'light'
  rootElement.style.setProperty('color-scheme', resolved)
  rootElement.dataset.theme = resolved
  localStorage.setItem(THEME_KEY, JSON.stringify(theme))
}

/**
 * 테마 상태 관리 스토어  
 * 1. 초기화: 로컬 스토리지에서 이전 설정을 불러옵니다.
 * 2. 시스템 동기화: 브라우저의 다크모드 설정을 실시간으로 감지합니다.
 * 3. 파생된 상태: theme과 시스템 설정을 조합해 isDarkMode를 계산합니다.
 */
const useThemeStore = create<ThemeState>()(
  devtools(
    immer((set, get) => ({

      // --- 초기 상태 설정 ---
      
      theme: (() => {
        const saved = localStorage.getItem(THEME_KEY)
        return saved ? (JSON.parse(saved) as Theme) : 'system'
      })(),

      isDarkMode: false, // 초기값은 아래 subscribe에서 즉시 업데이트됨

      // --- 액션 구현 ---
      
      /**
       * [테마 설정: setTheme]  
       * 테마를 설정하고 상태를 업데이트합니다.
       * @param nextTheme - 설정할 테마 ('light' | 'dark' | 'system')
       */
      setTheme: (nextTheme) => {
        const isSystemDark = darkMediaQuery.matches
        const nextIsDark = nextTheme === 'system' ? isSystemDark : nextTheme === 'dark'
        
        set((state) => {
          state.theme = nextTheme
          state.isDarkMode = nextIsDark
        }, false, 'theme/setTheme')
        
        applyTheme(nextTheme, nextIsDark)
      },

      /**
       * [시스템 테마 동기화: syncSystemTheme]  
       * 시스템 테마 변경 시 내부 상태를 동기화합니다.
       */
      syncSystemTheme: () => {
        const { theme } = get()
        if (theme !== 'system') return

        const isSystemDark = darkMediaQuery.matches
        
        set((state) => {
          state.isDarkMode = isSystemDark
        }, false, 'theme/syncSystemTheme')
        
        applyTheme('system', isSystemDark)
      },
    })),
    { name: 'ThemeStore' }
  )
)

/**
 * 외부 시스템 구독  
 * 브라우저의 시스템 테마 변경을 감지하여 스토어 액션을 호출합니다.  
 * 리액트 생명주기 밖에서 실행되어 전역적으로 테마를 동기화합니다.
 */
darkMediaQuery.addEventListener('change', () => {
  useThemeStore.getState().syncSystemTheme()
})

// 초기 실행 시 테마 적용 (첫 렌더링 전 동기화)
const initialTheme = useThemeStore.getState().theme
useThemeStore.getState().setTheme(initialTheme)

/**
 * 테마 상태와 변경 함수를 객체로 반환합니다.
 * 
 * @example
 * const { theme, isDarkMode, setTheme } = useTheme()
 * 
 * return (
 *   <button type="button" onClick={() => setTheme('dark')}>
 *     현재 상태: {isDarkMode ? '🌙' : '☀️'}
 *   </button>
 * )
 */
export const useTheme = () => {
  return useThemeStore(
    useShallow((state) => ({
      theme: state.theme,
      isDarkMode: state.isDarkMode,
      setTheme: state.setTheme,
    }))
  )
}

/**
 * 다크모드 여부(boolean)만 구독하여, 테마 모드('system' 등)가  
 * 바뀌어도 결과값(isDarkMode)이 같다면 리렌더링되지 않습니다.
 * 
 * @example
 * const isDarkMode = useIsDarkMode()
 * return <div style={{ color: isDarkMode ? 'white' : 'black' }}>...</div>
 */
export const useIsDarkMode = () => useThemeStore((state) => state.isDarkMode)

/**
 * 테마를 변경하는 함수(`setTheme`)만 단독으로 구독합니다.  
 * 이 훅은 상태값(theme, isDarkMode)을 직접 구독하지 않습니다.  
 * 따라서 테마가 변경되어도 이 훅을 사용하는 컴포넌트는 불필요한 리렌더링이 발생하지 않습니다.
 * 
 * @example
 * function ThemeButton() {
 *   const setTheme = useSetTheme()
 * 
 *   return (
 *     <button 
 *       type="button" 
 *       onClick={() => setTheme('dark')}
 *     >
 *       다크 모드
 *     </button>
 *   )
 * }
 */
export const useSetTheme = () => useThemeStore((state) => state.setTheme)

export default useThemeStore
