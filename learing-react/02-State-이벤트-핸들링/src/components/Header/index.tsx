import type { ReactNode } from 'react'
import Wrapper from '../Wrapper'
import S from './style.module.css'

interface HeaderProps {
  children: ReactNode
}

function Header(props: HeaderProps) {
  // console.log(props.children) // VHS 비디오 테이프 / <slot></slot>
  // props.children 데이터 인가요?
  // JSX에 데이터 바인딩 가능?

  /**
   * 컴포넌트의 `children` 속성
   * ✅ 부모 내부에 삽입되는 (리액트) 자식 요소들 (배열: Array)
   * ✅ 컴포넌트의 props.children을 통해 전달됨
   * ✅ `children` prop 타입 정의 (인라인 → 인터페이스)
   */

  return (
    <header className={S.header}>
      <Wrapper>{props.children}</Wrapper>
    </header>
  )
}

export default Header
