import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { enableMapSet } from 'immer'

// Immer에서 Map과 Set을 사용할 수 있도록 플러그인 활성화
enableMapSet()

import App from './app'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('문서에 #root인 요소가 없습니다. 확인해보세요.')
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
)
