/* eslint-disable react-hooks/refs */
import S from '../RefStudy.module.css'

// --------------------------------------------------------
// 실습 가이드
// --------------------------------------------------------
// 1. time 상태 생성 (초기값: 로케일 타임 설정)
// 2. isTimerRunning 상태 생성 (초기값: false)
// 3. timerIdRef 참조 생성 (타이머 ID 저장용: 렌더링과 무관)
// 4. 타이머 시작 버튼 클릭 시, 실행될 startTimer 함수 로직 작성
// 5. 타이머 정지 버튼 클릭 시, 실행될 stopTimer 함수 로직 작성
// 6. 버튼 비활성화 제어 (접근성 고려)
// --------------------------------------------------------

export default function TimerIdentifier() {
  const time = new Date().toLocaleTimeString()
  const timerIdRef = { current: undefined }
  const isTimerRunning = false

  const startTimer = () => {}

  const stopTimer = () => {}

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
          onClick={startTimer}
        >
          타이머 시작
        </button>
        <button type="button" className={S.button} onClick={stopTimer}>
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
