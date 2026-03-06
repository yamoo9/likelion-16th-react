import Button from '../components/button/Button'
import styles from './App.module.css'

// console.log(Button) // React 함수형 컴포넌트(Functional Component)

// console.log(styles) // CSS Modules 기술을 사용해 내보내진 JS 객체

/**
 * JSX (JavaScript eXtension: 자바스크립트 확장 (비표준: 브라우저 해석 못함: SyntaxError))
 * 빌드(컴파일 + 번들링) 도구에서만 JSX 사용 가능
 * Build Tools (Vite, Webpack, Turbopack, ....)
 * *.tsx (TypeScript + JSX) -> TSC -> *.js (React API: React.createElement(type, props, ...children))
 */

export default function App() {
  // 함수 안에 데이터 선언
  const size = 120

  // return null /* 아무 것도 반환하지 않음 (화면에 아무 것도 그리지 않음) */

  // 함수가 JSX(React.ReactNode 타입) 반환
  // JSX (JavaScript 확장 구문: 마크업 (구조 설계 in JavaScript 파일))
  // JSX는 문(statement)이다? ❌ 값(expression, value)이다? ⭕️
  return (
    <>
      <header className={styles.header}>
        <h1>
          <dfn>
            <abbr title="JavaScript eXtension">JSX</abbr>
          </dfn>{' '}
          기초 배우기
          <Button />
        </h1>
      </header>
      <main className={styles.main}>
        <section>
          <h2>모든 태그는 반드시 닫혀야 합니다.</h2>
          <Button />
          <p>
            <dfn>
              <abbr title="Hyper Text Markup Language">HTML</abbr>
              에서는 허용되었던 {'<img>'} 태그도 반드시 닫아야 합니다.
            </dfn>
            <img
              src="/react.svg"
              alt="리액트 로고"
              width={size}
              height={size}
            />
          </p>
        </section>
        <section>
          <h2>
            <abbr>HTML</abbr>이 아닙니다.
          </h2>
          <div className={styles.field}>
            <label htmlFor="username">이름</label>
            <input
              id="username"
              type="text"
              className={styles.input}
              placeholder="이름을 입력하세요."
            />
          </div>
        </section>
        <section>
          <h2>웹 표준과 접근성을 준수해야 합니다.</h2>
          {/* 리액트 컴포넌트 (JSX 구문 : React.createElement(Button)) */}
          <Button />
        </section>
      </main>
      <footer className={styles.footer}>
        <small>
          COPYRIGHT RESERVED. © <abbr title="이듬(EUID)">EUID</abbr>. "완벽보다
          완주를!"
        </small>
      </footer>
    </>
  )
}
