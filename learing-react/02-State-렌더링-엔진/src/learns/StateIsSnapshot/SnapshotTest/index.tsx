import { useState } from 'react'
import S from './style.module.css'

// 상수는 변하지 않는 값
const INITIAL_COUNT = 9

// 변수는 변하는 값 (누가 언제 어떻게 변경할지 아무도 예측할 수 없다)
// let timeoutId = 0 // 부수 효과 (Side Effect, 부작용)

export default function SnapshotTest() {
  // 상태는 [ 특정 렌더링 시점의 ] "스냅샷(Snapshot)"이다.
  // -> 상태는 현재 렌더링 시점에서 바꿀 수 없다.
  // -> 업데이트된 상태는 다음 렌더링 시점에서 주어진다.

  // [개발자 시점] 상태 선언
  // [리액트 관점] 관리 중인 상태의 '현재 스냅샷'을 전달했다.
  const [count, setCount] = useState(INITIAL_COUNT)

  // 사이드 이펙트(Side Effect)를 유발하지 않고
  // 문제를 해결하기 위해 상태를 선언하고 관리
  const [timeout] = useState({ id: 0 })

  // 상태 업데이트 로직을 포함하는 핸들러 작성
  const handleIncreaseFive = () => {
    // 사전에 설정된 타이머 해제
    clearTimeout(timeout.id) // 0

    // 상태 업데이트 (리액트에게 요청)
    const nextCount = count + 5
    setCount(nextCount)

    // count 상태 로그
    console.log('현재 카운트 값', { count })
    console.log('다음 렌더링 시점의 카운트 값', { nextCount })

    // 비동기 알림 확인
    // eslint-disable-next-line react-hooks/immutability
    timeout.id = setTimeout(() => {
      alert(`3초 뒤 알림창에 뜬 카운트 값 ${count}`)
    }, 3000)

    console.log(timeout)
  }

  const handleResetCount = () => {
    setCount(INITIAL_COUNT)
  }

  return (
    <section className={S.container}>
      <h2 className={S.title}>현재 카운트: {count}</h2>

      <div role="group" className={S.buttonGroup}>
        <button type="button" onClick={handleIncreaseFive} className={S.button}>
          +5 증가시키고 로그/알림 확인
        </button>
        <button
          type="button"
          onClick={handleResetCount}
          className={`${S.button} ${S.reset}`}
        >
          초기화
        </button>
      </div>
    </section>
  )
}
