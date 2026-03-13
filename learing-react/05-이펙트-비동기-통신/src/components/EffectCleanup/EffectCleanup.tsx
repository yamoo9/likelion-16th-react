import { useEffect, useState } from 'react'
import S from './EffectCleanup.module.css'

export default function EffectCleanup() {
  // 타이머 표시/감춤 상태 선언
  const [isShow, setIsShow] = useState(false)

  // 토글(Toggle): ON/OFF 스위치 (켜거나 끄거나)
  const handleToggle = () => setIsShow(!isShow)

  return (
    <article className={S.container}>
      <header>
        <h2>이펙트(Effect) 클린업</h2>
        <p>컴포넌트의 소멸과 자원 정리 과정을 관찰합니다.</p>
      </header>

      <button
        type="button"
        className={S.toggleButton}
        onClick={handleToggle}
        aria-pressed={isShow}
      >
        타이머 {isShow ? '제거' : '추가'}
      </button>

      <div role="region" aria-live="polite">
        {isShow ? <Timer /> : null}
      </div>
    </article>
  )
}

function Timer() {
  // 리액트의 상태 선언 (상태 = 반응성 데이터 = 변경되면 리액트가 반응한다)
  const [seconds, setSeconds] = useState(0)

  // 특정 시간마다 콜백 함수를 실행하는 방법 (타이머 : 웹 API)
  // 리액트 관점에서 보면 타이머는 리액트의 렌더링과 관련이 있다? 없다?
  // 타이머 조작은 사이드 이펙트이다 ✅
  // 사이드 이펙트는 리액트의 순수함수 영역인 컴포넌트 바디 안에서 어떻게 처리해야 할까?
  // 이펙트 사용!!
  useEffect(
    // effect `setup` function
    () => {
      console.log('타이머 시작')
      // Web API (setInterval, 특정 주기마다 콜백 함수 실행, 1000ms === 1s)
      const intervalId = setInterval(() => {
        setSeconds((s) => s + 1)
        console.log('타이머 작동 중...')
      }, 1000)

      // return `cleanup` function
      return () => {
        // 여기서 정리(예: 타이머 해제)하세요!
        clearInterval(intervalId)
        console.log('[클린업] 타이머 해제')
      }
    },
    // 오직 처음 렌더링할 때 한 번만 타이머를 가동하면 된다.
    [],
  )

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
