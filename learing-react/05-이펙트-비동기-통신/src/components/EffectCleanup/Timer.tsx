import { useEffect, useState } from "react"
import S from './EffectCleanup.module.css'

export default function Timer() { 
  const [seconds, setSeconds] = useState(0)

  console.group('[리액트]')

  useEffect(
    // 이펙트 설정(setup) 함수
    () => {
      console.group('[리액트 → 브라우저]')
        console.log('[리액트] DOM 커밋(commit)')
        console.log('[브라우저] 리플로우/리페인트')
      console.groupEnd()

      console.group('[이펙트]')
        console.log('[이펙트 함수 실행] 타이머 시작(연결)')
      // Web API (setInterval, 특정 주기마다 콜백 함수 실행, 1000ms === 1s)
      const intervalId = setInterval(() => {
        console.group('[웹 API]')
          console.log('[타이머 콜백 실행] 상태 업데이트 요청 (render trigger)')
          setSeconds((s) => s + 1)
        console.groupEnd()
      }, 1000)
      console.groupEnd()

      // 정리(cleanup) 함수 반환
      return () => {
        console.group('[클린업]')
          // 여기서 정리(예: 타이머 해제)하세요!
          clearInterval(intervalId)
          console.log('[클린업 함수 실행] 타이머 종료(해제)')
        console.groupEnd()
      }
    },
    // 오직 처음 렌더링할 때 한 번만 타이머를 가동하면 된다.
    [],
  )

    console.log('[리액트] 컴포넌트 렌더링(rendering)')

  console.groupEnd()

  return (
    <div className={S.card}>
      <p className={S.info}>실시간 타이머</p>
      <output className={S.timerDisplay} aria-live="polite" aria-atomic="true">
        {seconds}s
      </output>
      <span className={S.info}>
        이 카드가 사라지면 콘솔 로그도 멈춰야 합니다.
      </span>
    </div>
  )
}
