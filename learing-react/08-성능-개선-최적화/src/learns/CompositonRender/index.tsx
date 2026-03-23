import { useState } from 'react'
import { formatTime } from './util/formatTime'
import S from './style.module.css'


const getCurrentDatetime = () => new Date()

export default function CompositionRender({children}: React.PropsWithChildren) {
  const [time, setTime] = useState(getCurrentDatetime)
  const handleGetCurrentDateTime = () => setTime(getCurrentDatetime())

  console.log('CompositionRender 렌더링')

  return (
    <div className={S.container}>
      <section className={S.timerSection}>
        <h2 className={S.title}>현재 시간</h2>
        <p className={S.timeDisplay}>
          <time dateTime={time.toISOString()}>{formatTime(time)}</time>
          <button
            type="button"
            className={S.button}
            onClick={handleGetCurrentDateTime}
          >
            현재 시간 가져오기
          </button>
        </p>
      </section>

      <div className={S.counterSection}>
        {children}
      </div>
    </div>
  )
}
