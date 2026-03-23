import { useEffect, useState } from 'react'
import { formatTime } from './util/formatTime'
import GrandFather from './parts/GrandFather'
import S from './style.module.css'

export default function MemoizationRender() {
  const [time, setTime] = useState(new Date())
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)
    
    return () => {
      clearInterval(timer)
    }
  }, [])
  
  const [count, setCount] = useState(0)
  
  return (
    <div className={S.container}>
      <section className={S.timerSection}>
        <h2 className={S.title}>현재 시간</h2>
        <time dateTime={time.toISOString()} className={S.timeDisplay}>
          {formatTime(time)}
        </time>
      </section>

      <div className={S.counterSection}>
        <GrandFather count={count} setCount={setCount} />
      </div>
    </div>
  )
}