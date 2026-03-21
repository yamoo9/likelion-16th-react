import { useEffect, useState } from 'react'
import { formatTime } from './util/formatTime'
import GrandFather from './parts/GrandFather'
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
  // const expensiveValue = getExpensiveValue(count)

  return (
    <div className={S.container}>
      <section className={S.section}>
        <h2 className={S.title}>현재 시간</h2>
        <time dateTime={time.toISOString()} className={S.display}>
          {formatTime(time)}
        </time>
      </section>

      {/* 
      <section className={S.section}>
        <h2 className={S.title}>계산된 값</h2>
        <p className={S.display}>{expensiveValue}</p>
      </section>
      */}

      <div className={S.counterSection}>
        <GrandFather {...grandFatherProps} />
      </div>
    </div>
  )
}
