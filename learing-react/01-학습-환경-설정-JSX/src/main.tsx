import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/App'
import './styles/main.css'

// 실제 DOM의 컨테이너 요소 찾기
const rootElement = document.getElementById('root')

// 방어적 프로그래밍
// rootElement가 null일 가능성을 걷어내자!
if (!rootElement) {
  throw new Error('문서에 #root인 요소가 없습니다. 확인해보세요.')
}

// React(Virtual) DOM (가짜 문서 객체 모델의 뿌리)
const ReactDOMRoot = createRoot(rootElement)

// React DOM을 실제 DOM에 렌더링
ReactDOMRoot.render(
  <StrictMode>
    <App />
  </StrictMode>,
)