import { useEffect, useState } from 'react'
import GrandFather from './parts/GrandFather'
import { formatTime } from './util/formatTime'
import S from './style.module.css'

export default function MemoizationValue() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const [count, setCount] = useState(1)

  // GrandFather 컴포넌트에 props 객체로 전달할 경우
  const grandFatherProps = {
    count,
    onIncreament: () => setCount((prev) => prev + 1),
  }

  // 비용이 많이 드는 계산
  // - getExpensiveValue
  // - computedTime
  const calcurateTime = 0

  return (
    <div className={S.container}>
      <section className={S.section}>
        <h2 className={S.title}>현재 시간</h2>
        <time dateTime={time.toISOString()} className={S.display}>
          {formatTime(time)}
        </time>
      </section>
      
      <section className={S.section}>
        <h3 className={S.title}>렌더링될 때마다 계산된 시간</h3>
        <p className={S.display}>{calcurateTime.toLocaleString()+'ms'}</p>
      </section>

      <div className={S.counterSection}>
        <GrandFather {...grandFatherProps} />
      </div>
    </div>
  )
}



// -------------------------------------------------------------------------
// useMemo 훅을 사용해야 할 때 (성능 최적화가 필요한 시점)
// -------------------------------------------------------------------------
// - 연산 비용이 큰 경우
//   렌더링 과정(동기적 실행)에 지장을 주어 화면 끊김을 유발할 만큼 무거운 연산인 경우.
// - 상태가 자주 바뀌는 경우 (상태 격리)
//   현재 연산과 무관한 다른 상태(예: 타이머) 때문에 컴포넌트가 빈번하게 리렌더링될 때.
// - 참조 동일성 유지가 필요한 경우 (자식이 메모화된 경우)
//   props로 넘기는 객체/배열의 참조값이 바뀌어 자식의 React.memo가 깨지는 것을 방지할 때.
// -------------------------------------------------------------------------

// -------------------------------------------------------------------------
// useMemo 훅을 사용하지 말아야 할 때 (오버헤드가 더 큰 시점)
// -------------------------------------------------------------------------
// - 단순한 연산
//   `const sum = a + b` 같은 가벼운 연산 → 메모리 점유 및 의존성 비교 비용이 더 큼.
// - 의존성 배열이 너무 자주 바뀌는 경우
//   매 렌더링마다 의존성 값이 바뀐다면, 메모(memo)를 생성하고 비교하는 과정만 추가될 뿐임.
// - 리렌더링이 드문 컴포넌트
//   컴포넌트 자체가 자주 리렌더링되지 않는다면 최적화의 실익이 없음.
// -------------------------------------------------------------------------