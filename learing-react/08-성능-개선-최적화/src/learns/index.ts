// 리렌더링 연쇄 반응 - 성능 진단
export { default as DeepRender } from './DeepRender'

// 구조적 최적화 (props.children 활용) - 컴포넌트 합성과 참조 유지
export { default as CompositionRender } from './CompositonRender'

// 메모이제이션(기억한다) - "이미 렌더링된 컴포넌트를 기억한다"
export { default as MemoizationRender } from './MemoizationRender'

// 메모이제이션 - 함수(참조형 데이터)
export { default as MemoizationCallback } from './MemoizationCallback'

// 메모이제이션 - 값(참조형 데이터)
export { default as MemoizationValue } from './MemoizationValue'
