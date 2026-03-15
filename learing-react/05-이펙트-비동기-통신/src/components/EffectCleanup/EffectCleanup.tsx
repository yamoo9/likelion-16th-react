import { useState } from 'react'
import Timer from './Timer'
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