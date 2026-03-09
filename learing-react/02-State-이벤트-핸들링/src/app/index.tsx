// import { createElement } from 'react'
import Footer from '@/components/Footer'
import S from './style.module.css'

export default function App() {
  return (
    <div className={S.container}>
      <div data-placeholder />
      <Footer slogan={'모든 이들에게 행복을!'} />

      {/* {createElement(
        // 컴포넌트 이름 (Component Name)
        Footer,
        // 컴포넌트 속성 (Component Props)
        { slogan: '완주 이후엔 스스로 학습 가능!' },
      )} */}
    </div>
  )
}
