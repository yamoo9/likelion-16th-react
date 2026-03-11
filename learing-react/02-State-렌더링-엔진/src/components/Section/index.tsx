import S from './style.module.css'

interface SectionProps {
  title: string
  isShowTitle?: boolean
  children?: React.ReactNode
}

function Section(props: SectionProps) {
  /**
   * 컴포넌트 title, children 속성
   * ✅ 컴포넌트 타입 정의 (인라인 → 인터페이스)
   * ✅ 섹션 제목 설정 (필수)
   * ✅ 섹션 제목 화면에 표시 여부 설정 (선택)
   * ✅ 섹션 내부에 넣을 (리액트) 자식 요소 설정 (선택)
   */

  // let headingClassname // undefined

  // if 문 (JSX 안에 사용 못함!)
  // JSX 안에서 조건 처리하려면 표현식(Expression)이어야 함
  // if (!props.isShowTitle) {
  //   headingClassname = 'sr-only'
  // }

  return (
    <section className={S.container}>
      <h1 className={props.isShowTitle ? undefined : 'sr-only'}>
        {props.title}
      </h1>
      {props.children}
    </section>
  )
}

export default Section
