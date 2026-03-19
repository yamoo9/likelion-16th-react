/* eslint-disable react-hooks/refs */
import { useRef, useState } from 'react'
import S from '../RefStudy.module.css'

// --------------------------------------------------------
// 실습 가이드
// --------------------------------------------------------
// 1. time 상태 생성 (초기값: 로케일 타임 설정) ✅
// 2. isTimerRunning 상태 생성 (초기값: false) ✅
// 3. timerIdRef 참조 생성 (타이머 ID 저장용: 렌더링과 무관)
// 4. 타이머 시작 버튼 클릭 시, 실행될 startTimer 함수 로직 작성 ✅
// 5. 타이머 정지 버튼 클릭 시, 실행될 stopTimer 함수 로직 작성 ✅
// 6. 버튼 비활성화 제어 (접근성 고려) ✅
// --------------------------------------------------------

const getLocaleTime = () => new Date().toLocaleTimeString()

// 웹 브라우저 전용 타입
// type TimerId = number | undefined

// 웹 브라우저 / Node.js 양쪽 환경에서 사용 가능한 타입 지정
type SetInterval = typeof setInterval
type TimerId = ReturnType<SetInterval> | undefined

export default function TimerIdentifier() {
  const [time, setTime] = useState(getLocaleTime) // 현재 로케일 타임 상태
  const [isTimerRunning, setIsTimerRunning] = useState(false) // 타이머가 실행 중인지 여부 상태
  
  // 어라? 컴포넌트가 1초마다 다시 렌더링되는데?
  // 지역 변수다 보니.. 값이 초기화되네? 이전 값을 기억 못하네?
  // 아 그러면 상태를 써야 하나? 기억해야 하니까? (그런데 상태를 사용하면 화면이 바뀔텐데?)
  // 그럼 뭘 써야 하나? (기억은 하고 싶은데 화면은 안 바뀌어되는데...)
  // let intervalId: number | undefined = undefined

  const timerIdRef = useRef<TimerId>(undefined)

  const startTimer = () => {
    // [연타! 방어] 이미 타이머가 작동 중이라면? 함수 종료
    if (isTimerRunning) return

    // 타이머 작동 중 상태로 변경 (상태 업데이트)
    setIsTimerRunning(true)

    // 클릭하자 마자, 화면의 로케일 타임도 변경 (상태 업데이트)
    const nextTime = getLocaleTime()
    setTime(nextTime)

    // 1초 마다 외부 시스템인 웹 API(타이머)를 사용해
    // 관리 중인 time 상태 업데이트
    timerIdRef.current = setInterval(() => {
      // 1초 마다, 화면의 로케일 타임 변경 (상태 업데이트)
      setTime(getLocaleTime())
    }, 1000)

    console.log({intervalId: timerIdRef.current})
  }

  const stopTimer = () => {
    // [연타! 방어] 타이머가 현재 작동되지 않았다면? 함수 종료
    if (!isTimerRunning) return

    // 타이머 정지 상태로 변경 (상태 업데이트)
    setIsTimerRunning(false)

    // 타이머 정지 (clearInterval 사용)
    console.log({intervalId: timerIdRef.current})
    clearInterval(timerIdRef.current)

    // 타이머 식별자 상태 초기화 (메모리 회수)
    timerIdRef.current = undefined
  }

  return (
    <section className={S.section}>
      <h3 className={S.title}>내부 식별자 저장 (Timer ID)</h3>
      <div className={S.display}>
        <div>
          상태: <strong>{isTimerRunning ? '▶️ 실행 중' : '⏹️ 정지됨'}</strong>
        </div>
        <div>
          Timer ID (Ref): <strong>{timerIdRef.current ?? '없음'}</strong>
        </div>
      </div>
      <div role="group" className={S.inputGroup}>
        <button
          type="button"
          className={`${S.button} ${!isTimerRunning ? S.primary : ''}`}
          aria-disabled={isTimerRunning}
          onClick={startTimer}
        >
          타이머 시작
        </button>
        <button
          type="button"
          className={S.button}
          aria-disabled={!isTimerRunning}
          onClick={stopTimer}
        >
          타이머 정지
        </button>
        <time className={S.timeDisplay} aria-live="polite">
          {time}
        </time>
      </div>
      <p className={S.info}>
        로직에는 필요하지만 화면에는 그릴 필요가 없는 값을 저장합니다.
      </p>
    </section>
  )
}
