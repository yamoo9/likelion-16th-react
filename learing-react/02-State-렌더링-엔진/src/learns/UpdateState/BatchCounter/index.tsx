import { useState } from 'react'
import S from './style.module.css'

// 카운트 상태 초기값
const INITIAL_COUNT = 0

export default function BatchCounter() {
  // 컴포넌트의 카운트 상태 선언
  // 불변 값(immutable value)
  const [count, setCount] = useState(INITIAL_COUNT)

  // 카운트 초기화 핸들러 작성
  const handleResetCount = () => setCount(INITIAL_COUNT)

  // 카운트 + 1 핸들러 작성 (실습)
  const handleIncreaseSingle = () => {
    const nextCount = count + 1
    setCount(nextCount)
  }

  // 카운트 + 1 → 카운트 + 1 → 카운트 + 1 이벤트 핸들러 작성 (실습)
  const handleIncreaseTripple = () => {
    // Batch '일괄적으로 한꺼번에' 업데이트
    // 조건: setCount 함수를 3번 사용

    setCount((prevCount) => prevCount + 1) // 리액트! 설정한 다음 상태 값으로 화면 그려!
    setCount((prevCount) => prevCount + 1) // 리액트! 설정한 다음 상태 값으로 화면 그려!
    setCount((prevCount) => prevCount + 1) // 리액트! 설정한 다음 상태 값으로 화면 그려!

    // 현재 렌더링 시점
    // count = 0

    // 다음 렌더링 시점
    // Queue [
    //   (prevCount /* 0 */) => prevCount + 1,
    //   (prevCount /* 1 */) => prevCount + 1,
    //   (prevCount /* 2 */) => prevCount + 1,
    // ]

    // 다음 렌더링 시 count 상태 값은? 3
  }

  return (
    <article className={S.container}>
      <h3 className={S.display} aria-label={`배치 카운터 현재 값: ${count}`}>
        {count}
      </h3>

      <div className={S.actions}>
        <button
          type="button"
          className={S.button}
          // 인라인 이벤트 핸들러 (상태 업데이트 요청)
          onClick={handleResetCount}
        >
          초기화
        </button>

        <button
          type="button"
          className={`${S.button} ${S.primary}`}
          onClick={handleIncreaseSingle}
        >
          +1 증가 (Single)
        </button>

        <button
          type="button"
          className={`${S.button} ${S.primary}`}
          onClick={handleIncreaseTripple}
        >
          +3 증가 (Batching)
        </button>
      </div>

      <p>리액트의 상태 업데이트는 큐(Queue)를 사용해 처리됩니다.</p>
    </article>
  )
}
