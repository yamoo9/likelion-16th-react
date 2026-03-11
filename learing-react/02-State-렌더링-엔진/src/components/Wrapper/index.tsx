import S from './style.module.css'

interface WrapperProps {
  width?: string | number // 선택?(optional)
  children?: React.ReactNode // 필수(required)
}

function Wrapper({ width, children }: WrapperProps) {
  /**
   * 컴포넌트 children, width 속성
   * ✅ 컴포넌트 타입 정의 (인라인 → 인터페이스)
   * ✅ 래퍼 내부에 넣을 (리액트) 자식 요소 설정
   * ✅ 래퍼의 너비(width) 설정
   */

  const widthValue = typeof width === 'number' ? `${width}px` : width
  const styles = { '--width': widthValue } as React.CSSProperties

  return (
    <div className={S.container} style={styles}>
      {children}
    </div>
  )
}

export default Wrapper
