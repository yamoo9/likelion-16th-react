/* eslint-disable react-hooks/immutability */

import { useRef, useState } from 'react'
import S from '../RefStudy.module.css'

export default function CounterComparison() {
  // State (Memoized + Change View : Immutable)
  const [countState, setCountState] = useState(0)
  const handleIncreamentState = () => {
    setCountState((c) => c + 1)
  }

  // Variable (.) === render() 지역 변수
  let countVariable = 0
  const handleIncreamentVariable = () => {
    console.log(`지역 변수 count의 현재 값 ${countVariable}`)
    countVariable += 1
  }

  // Ref (Memoized : Mutation)
  // const countRef = { current: 0 } // 지역 변수 (렌더링 될 때마다ㅏ 초기화)
  const countRef /* { current: 0 } */ = useRef(0) // React.useRef(number) -> React.RefObject<number>

  const handleIncreamentRef = () => {
    console.log(`Ref 객체 countRef의 현재 값 ${countRef.current}`)
    // 일반 자바스크립트 오브젝트일 뿐 (뮤테이션 허용)
    countRef.current += 1 // 뮤테이션(변이)
  }

  return (
    <section className={S.section}>
      <h3 className={S.title}>State vs Ref 비교</h3>
      <div className={S.display}>
        <div>
          <dfn>State</dfn> 렌더링 <span aria-label="처리">⭕️</span>{' '}
          <strong>{countState}</strong>
        </div>
        <div>
          <dfn>Variable</dfn> 렌더링 <span aria-label="안함">❌</span>{' '}
          <strong>{countVariable}</strong>
        </div>
        <div>
          <dfn>Ref</dfn> 렌더링 <span aria-label="안함">❌</span>{' '}
          <strong>{countRef.current}</strong>
        </div>
      </div>
      <div role="group" className={S.inputGroup}>
        <button
          type="button"
          className={S.button}
          onClick={handleIncreamentState}
        >
          State 증가 ({countState})
        </button>
        <button
          type="button"
          className={S.button}
          onClick={handleIncreamentVariable}
        >
          Variable 증가 ({countVariable})
        </button>
        <button
          type="button"
          className={S.button}
          onClick={handleIncreamentRef}
        >
          Ref 증가 ({countRef.current})
        </button>
      </div>
    </section>
  )
}
