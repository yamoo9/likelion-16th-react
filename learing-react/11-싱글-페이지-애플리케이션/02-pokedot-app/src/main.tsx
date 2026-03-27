import { StrictMode, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('문서에 #root인 요소가 없습니다. 확인해보세요.')
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
)
