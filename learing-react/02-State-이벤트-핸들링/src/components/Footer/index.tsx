import Wrapper from '../Wrapper'
import S from './style.module.css'

// 컴포넌트 Props(반드시 객체) 인터페이스(약속) 선언
interface FooterProps {
  slogan: string
}

// 타입스크립트 = 타입 시스템과 함께 사용할 수 있는 자바스크립트
// export default function 함수_컴포넌트_이름(속성_매개변수: 타입) {
export default function Footer(props: FooterProps) {
  /**
   * Props로 데이터 전달(부모 → 자식)
   * - ✅ 부모에서 자식으로 전달하는 데이터
   * - ✅ React.createElement API에서 Props 객체
   * - [] Props 타입 정의 (인라인 → 인터페이스)
   */
  // const slogan = '완벽보다 완주를!'

  // 부모(상위) 컴포넌트가 자식(하위) 컴포넌트에 전달한 데이터 집합 = Props (Properties)
  // JavaScript : 함수이름(데이터) -> function 함수이름(매개변수) {}
  // React : React.createElement(컴포넌트이름, { 키: 값 }) -> function 컴포넌트이름(props) {}
  // console.log({ props }, props.slogan)

  /**
   * 데이터 바인딩 (Data Binding = Data + JSX = Markup)
   * - JavaScript 데이터(변수, 상수, 계산된 값 등)
   * - JSX 구문 안에 데이터 끼워넣기(Interpolation, {data})
   */
  const currentYear = new Date().getFullYear() // 숫자 값이 아닌, 날짜 객체 현재 년도 가져오기

  /**
   * 접근성 고려
   * - 사용자가 이해하기 쉽고 읽기 쉽도록 저작권 레이블(label) 구성
   */
  const copyrightLabel = `모든 저작권은 이듬(EUID)에 있습니다. ${props.slogan}`

  return (
    <footer className={S.footer}>
      <Wrapper>
        <small aria-label={copyrightLabel}>
          {currentYear} COPYRIGHT RESERVED. ©{' '}
          <abbr title="이듬(EUID)">EUID</abbr>. {props.slogan}
        </small>
      </Wrapper>
    </footer>
  )
}
