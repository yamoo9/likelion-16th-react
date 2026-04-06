import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { combine, devtools, persist } from 'zustand/middleware'

/** 
 * 초기 상태(State) 정의
 * 공통으로 관리할 데이터의 기본값을 설정합니다.
 */
const initialState = {
  count: 0,
}

/**
 * useCounterStore: 카운터의 상태와 액션을 관리하는 커스텀 훅
 * 여러 미들웨어를 중첩하여 강력한 기능을 제공합니다.
 */
export const useCounterStore = create(
  // 1. devtools: 크롬 확장의 Redux DevTools에서 상태 변화를 추적하게 해줍니다.
  devtools(
    // 2. persist: 브라우저 저장소(localStorage 등)에 상태를 저장해 새로고침해도 유지합니다.
    persist(
      // 3. immer: 복잡한 상태를 다룰 때 불변성 관리 없이 마치 직접 수정하듯 코드를 짜게 해줍니다.
      immer(
        /**
         * 4. combine: 초기 상태와 액션 함수들을 하나로 합쳐주는 편리한 도구입니다.
         * 첫 번째 인자(initialState)는 상태가 되고, 두 번째 인자의 반환 객체는 액션이 됩니다.
         */
        combine(initialState, (set) => {
          return {
            // 상태(State)
            // combine 미들웨어 사용 시 생략 가능
            // ...initialState,

            // 액션(Actions)
            // 상태를 변경하는 함수들의 집합
            actions: {
              // 증가 액션
              increase: (delta: number) => {
                set(
                  (state) => {
                    // immer 덕분에 state.count += delta 처럼 직관적으로 수정 가능합니다.
                    state.count += delta
                  },
                  false, // 상태를 덮어쓰지 않고 병합함 (Zustand 기본 작동)
                  'counter/increase' // DevTools에 표시될 액션의 이름
                )
              },
              // 감소 액션
              decrease: (delta: number) => {
                set(
                  (state) => {
                    state.count -= delta
                  },
                  false,
                  'counter/decrease'
                )
              },
              // 초기화 액션
              reset: () => {
                // 초기 상태 객체로 완전히 교체합니다.
                set(initialState, false, 'counter/reset')
              },
            },
          }
        })
      ),
      // persist 설정: 로컬 스토리지에 저장될 키 이름
      { name: 'counter-storage' }
    ),
    // devtools 설정: DevTools에서 보여줄 스토어의 이름
    { name: 'CounterStore' }
  )
)

/**
 * [셀렉터(Selector) 훅]
 * 컴포넌트에서 필요한 데이터만 쏙 골라서 사용할 수 있게 하여
 * 불필요한 리렌더링을 방지하고 코드의 가독성을 높여줍니다.
 */

// 카운트 숫자 값만 가져오는 훅
export const useCounterValue = () => {
  return useCounterStore((state) => state.count)
}

// 상태 변경 함수(액션)들만 가져오는 훅
export const useCounterActions = () => {
  return useCounterStore((state) => state.actions)
}