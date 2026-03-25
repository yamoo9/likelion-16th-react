import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import LearingReactRouter from './_/app'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('문서에 #root인 요소가 없습니다. 확인해보세요.')
}

createRoot(rootElement).render(
  <StrictMode>
    
    {/* 1. 리액트 라우터 학습 */}
    <LearingReactRouter />

    {/* 2. 포케닷(Pokedot) SPA 구성 실습 */}
    {/* <App /> */}
  </StrictMode>
)
