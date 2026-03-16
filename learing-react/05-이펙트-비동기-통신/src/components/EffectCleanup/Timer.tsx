import { useEffect, useState } from 'react'
import S from './EffectCleanup.module.css'

// 지연된 초기화 (lazy initialization)
// 값 비싼 계산이 요구되는 코드
const expensiveCalc = () => {
  console.group('값 비싼 계산')
    console.warn('값 비싼 계산이 수행됨')
    const startTime = Date.now()

    console.time('렌더링 지연 처리')
    // 0.1초 렌더링 지연
    while (Date.now() - startTime < 2000 /* 2s */) continue
    console.timeEnd('렌더링 지연 처리')
  console.groupEnd()

  return 0
}

export default function Timer() {
  const [seconds, setSeconds] = useState(expensiveCalc)

  useEffect(() => {
    // 메모리 힙(heap)의 동일 주소 참조를 사용해야 추가/제거가 가능!
    // 그러므로 함수를 참조하는 변수를 사용해야 합니다.
    const handleClick = () => {
      console.log(`현재 seconds 값은 "${seconds}"이다.`)
    }

    console.log(
      '%c[클린업] 이벤트 리스너 추가(연결)',
      'font-weight: 900; font-size: 24px; color: #0077c7;',
    )
    // 문서를 통해 사용자와 상호작용하도록 이벤트를 연결(추가)
    document.addEventListener('click', handleClick)

    // 정리가 필요하다 (연결된 이벤트를 제거해야 한다)
    return function cleanup() {
      console.log(
        '%c[클린업] 연결된 이벤트 제거',
        'font-weight: 900; font-size: 24px; color: #ff4857;',
      )
      document.removeEventListener('click', handleClick)
    }
  }, [seconds])

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

