// 이펙트 (Side Effects: "부수 효과" 리액트 앱의 렌더링에 영향을 끼칠 수 있는 요인) 기초
export { default as EffectBasic } from './EffectBasic/EffectBasic'

// 이펙트 의존성(Dependencies)
export { default as EffectDependencies } from './EffectDependencies/EffectDependencies'

// 이펙트 클린업(Cleanup)
export { default as EffectCleanup } from './EffectCleanup/EffectCleanup'

// 데이터 페칭 (Data Fetching) + 비동기 요청/응답 (async/await or promise)
export { default as DataFetching } from './DataFetching/DataFetching'

// 경쟁 상태 (Race Condition)
export { default as RaceCondition } from './RaceCondition/RaceCondition'

// 상태 업데이트 무시 (Ignore State Update)
export { default as IgnoreStateUpdate } from './IgnoreStateUpdate/IgnoreStateUpdate'
