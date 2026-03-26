import { create } from 'zustand'
import { useShallow } from 'zustand/shallow'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { authApi } from '@/services/auth'
import { TOKEN } from '@/config/token'

/**
 * [Zustand란?]  
 * Zustand는 React에서 상태(State)를 관리하기 위한 가볍고 빠른 라이브러리입니다.  
 * Redux보다 설정이 간편하며, Store라는 저장소에 데이터와 데이터를 수정하는 함수(Action)를 함께 담아 관리합니다.
 * 
 * [Zustand와 Context API의 차이]  
 * 기존 CollectionProvider의 복잡한 useEffect와 useMemo 로직을 스토어 내부로 통합합니다.  
 * Zustand는 외부에서 액션을 호출할 수 있어 컴포넌트 구조가 훨씬 단순해집니다.
 * 
 * [Zustand의 장점]  
 * Context API처럼 Provider로 감쌀 필요가 없어 컴포넌트 구조가 단순해집니다.  
 * 컴포넌트 외부(일반 JS 함수 등)에서도 모달을 열고 닫을 수 있습니다.  
 * 필요한 상태만 선택(Selector)하여 구독하므로 불필요한 리렌더링이 방지됩니다.
 */

// 데이터 타입 정의
interface User {
  id: string
  refreshToken: string
}

// 스토어 전체의 구조(상태 + 액션)를 정의합니다.
interface AuthState {
  // 상태 (State): 컴포넌트가 구독할 데이터
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean

  // 액션 (Actions): 상태를 변경하는 함수들
  checkAuth: () => Promise<void> // 앱 초기 구동 시 인증 복구
  login: (id: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

/**
 * [인증 상태 관리 스토어: useAuthStore]  
 * AuthProvider의 로직을 Zustand로 통합하여 전역에서 인증 상태를 관리합니다.
 * 
 * create<AuthState>() : 정의한 타입을 적용하여 스토어를 생성합니다.  
 * devtools : 크롬 확장 프로그램 Redux DevTools에서 상태 변화를 눈으로 볼 수 있게 해줍니다.  
 * immer : 객체나 배열의 상태를 변경할 때 복잡한 스프레드 연산(...state) 없이 직접 수정하는 문법을 지원합니다.
 */
const useAuthStore = create<AuthState>()(
  devtools(
    immer((set) => ({

      // --- 초기 상태 (Initial State) ---

      user: null,
      isLoading: true, // 앱이 처음 켜질 때 토큰 확인 중임을 나타냄
      isAuthenticated: false,

      // --- 액션 함수들 (Actions) ---

      /**
       * [자동 로그인 확인: checkAuth]  
       * useEffect 대신 앱의 최상위(App.tsx 등)에서 호출하여  
       * 로컬 스토리지의 토큰으로 사용자 정보를 복구합니다.
       */
      checkAuth: async () => {
        // set({ key: value }) 형태로 특정 상태만 간편하게 업데이트할 수 있습니다.
        set({ isLoading: true }, false, 'auth/checkAuthStarted')

        try {
          const refreshToken = localStorage.getItem(TOKEN)

          if (!refreshToken) {
            set({ isLoading: false, isAuthenticated: false }, false, 'auth/noRefreshToken')
            return
          }

          const authInfo = await authApi.refreshToken()
          if (!authInfo) {
            set({ isLoading: false, isAuthenticated: false }, false, 'auth/refreshFailed')
            return
          }

          // API 서버로부터 현재 사용자 정보 조회
          const userData = await authApi.getCurrentUser()

          if (userData) {
            /**
             * [set 함수의 콜백 인자]
             * set((state) => { ... }) 에서 'state'는 현재 스토어에 저장된 최신 데이터를 의미합니다.
             * immer 미들웨어 덕분에 `state.user = ...` 처럼 직관적으로 수정해도 안전하게 불변성이 유지됩니다.
             */
            set((state) => {
              state.user = { id: userData.userId, refreshToken }
              state.isAuthenticated = true
            }, false, 'auth/userFetched')
          }
        } catch (error) {
          console.error('인증 상태 복구 실패:', error)
          authApi.clearLocalAuthData()
          set({ user: null, isAuthenticated: false }, false, 'auth/authRecoveryFailed')
        } finally {
          set({ isLoading: false }, false, 'auth/checkAuthEnded')
        }
      },

      /**
       * [로그인 처리: login]  
       * 아이디/비번으로 인증을 시도하고 성공 시 스토리지와 상태를 업데이트합니다.
       */
      login: async (id: string, password: string) => {
        set({ isLoading: true }, false, 'auth/loginStarted')

        try {
          const response = await authApi.login({ id, password })
          const { refreshToken } = response

          // 브라우저를 새로고침해도 로그인 유지를 위해 토큰 저장
          localStorage.setItem(TOKEN, refreshToken)

          set((state) => {
            state.user = { id, refreshToken }
            state.isAuthenticated = true
          }, false, 'auth/loginSuccess')
        } catch (error) {
          console.error('로그인 처리 중 오류:', error)
          throw error // UI 컴포넌트에서 에러 메시지를 보여줄 수 있도록 에러를 던짐
        } finally {
          set({ isLoading: false }, false, 'auth/loginEnded')
        }
      },

      /**
       * [로그아웃 처리: logout]  
       * 서버 세션을 정리하고 클라이언트의 모든 인증 정보를 삭제합니다.
       */
      logout: async () => {
        try {
          // API 호출을 통해 서버 측 세션을 정리합니다.
          await authApi.logout()
        } catch (error) {
          console.error('로그아웃 API 호출 실패:', error)
        } finally {
          // 통신 성공 여부와 관계없이 로컬 데이터는 모두 삭제하여 보안 유지
          localStorage.removeItem(TOKEN)
          set({ user: null, isAuthenticated: false, isLoading: false }, false, 'auth/logoutSuccess')
        }
      },
    })),
    { name: 'AuthStore' }, // DevTools에서 식별할 이름
  ),
)

/**
 * [성능 최적화: Selector 패턴]  
 * 스토어 전체를 가져오면 스토어 내의 어떤 값만 바뀌어도 해당 컴포넌트가 리렌더링됩니다.  
 * 아래처럼 필요한 값만 골라내는 커스텀 훅을 만들면 성능 최적화에 유리합니다.
 * 
 * @example
 * const user = useAuthUser()
 */
export const useAuthUser = () => useAuthStore((state) => state.user)

/**
 * @example
 * const isAuth = useIsAuthenticated()
 */
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated)

/**
 * @example
 * const loading = useAuthLoading()
 */
export const useAuthLoading = () => useAuthStore((state) => state.isLoading)

/**
 * [성능 최적화: useShallow 사용]  
 * 여러 개의 함수(Actions)를 객체 형태로 한 번에 가져올 때 사용합니다.  
 * 
 * [얕은 비교(Shallow Comparison)란?]  
 * useShallow는 반환된 객체의 1단계 속성들을 이전 값과 비교합니다.  
 * 여기서는 checkAuth, login, logout 함수들의 참조값이 바뀌었는지만 확인합니다.  
 * Zustand의 액션 함수들은 한 번 생성되면 참조가 변하지 않으므로,  
 * 다른 상태(user 등)가 변경되더라도 이 훅을 사용하는 컴포넌트는 리렌더링되지 않습니다.
 * 
 * @example
 * const { login, logout, checkAuth } = useAuthActions()
 */
export const useAuthActions = () => {
  return useAuthStore(
    useShallow((state) => ({
      checkAuth: state.checkAuth,
      login: state.login,
      logout: state.logout,
    })),
  )
}

export default useAuthStore