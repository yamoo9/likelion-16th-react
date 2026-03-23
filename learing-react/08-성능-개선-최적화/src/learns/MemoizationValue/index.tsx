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
