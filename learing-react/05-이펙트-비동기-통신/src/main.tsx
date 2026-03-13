import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app'
import './styles/main.css'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('문서에 #root인 요소가 없습니다. 확인해보세요.')
}

const reactDomRoot = createRoot(rootElement)

reactDomRoot.render(
  <StrictMode>
    <App />
  </StrictMode>,
)
