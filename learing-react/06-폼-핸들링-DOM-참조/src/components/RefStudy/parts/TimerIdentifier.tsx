import { useState } from 'react'
import S from '../RefStudy.module.css'

export default function TimerIdentifier() {
  const [time, setTime] = useState(new Date().toLocaleTimeString())
  
  // TODO 1: 일반 변수는 렌더링될 때마다 초기화됩니다. 
  // 렌더링 사이에도 값을 유지할 수 있도록 useRef를 사용하여 timerIdRef를 선언하세요.
  let timerId: null | number = null
  
  const startTimer = () => {
    // TODO 2: 이미 타이머가 실행 중이라면 중복 실행되지 않도록 방어 로직을 작성하세요.

    // TODO 3: setInterval의 반환값(ID)을 timerIdRef.current에 저장하세요.
    // eslint-disable-next-line react-hooks/immutability
    timerId = window.setInterval(() => {
      console.log('타이머 작동 중... ID:', timerId)
      setTime(new Date().toLocaleTimeString())
    }, 1000)
  }

  const stopTimer = () => {
    // TODO 4: timerIdRef.current에 저장된 ID를 사용하여 타이머를 중지(clearInterval)하세요.
    if (timerId) {
      clearInterval(timerId)

      // TODO 5: 타이머 중지 후에는 Ref의 값을 다시 null로 초기화하세요.
      timerId = null
      console.log('타이머 정지!')
    }
  }

  // TODO 6: 현재 타이머가 실행 중인지 여부를 판단하는 변수를 만드세요. (Ref 값의 존재 여부 활용)
  const isTimerRunning = false 

  return (
    <section className={S.section}>
      <h3 className={S.title}>내부 식별자 저장 (Timer ID)</h3>
      <div className={S.display}>
        <div>
          상태: <strong>{isTimerRunning ? '▶️ 실행 중' : '⏹️ 정지됨'}</strong>
        </div>
        <div>
          {/* TODO 7: 화면에 현재 저장된 Timer ID를 표시하세요. (timerIdRef.current) */}
          Timer ID (Ref): <strong>{timerId ?? '없음'}</strong>
        </div>
      </div>
      <div role="group" className={S.inputGroup}>
        <button
          type="button"
          className={`${S.button} ${!isTimerRunning ? S.primary : ''}`}
          onClick={startTimer}
          // TODO 8: 실행 중일 때는 시작 버튼을 비활성화하세요.
        >
          타이머 시작
        </button>
        <button
          type="button"
          className={S.button}
          onClick={stopTimer}
          // TODO 9: 실행 중이 아닐 때는 정지 버튼을 비활성화하세요.
        >
          타이머 정지
        </button>
        <time className={S.timeDisplay} aria-live="polite">{time}</time>
      </div>
      <p className={S.info}>
        로직에는 필요하지만 화면에는 그릴 필요가 없는 값을 저장합니다.
      </p>
    </section>
  )
}