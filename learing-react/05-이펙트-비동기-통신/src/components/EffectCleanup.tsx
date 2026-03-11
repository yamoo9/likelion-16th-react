import S from './EffectCleanup.module.css'

export default function EffectCleanup() {
  
  return (
    <article className={S.container}>
      <header>
        <h2>이펙트(Effect) 클린업</h2>
        <p>컴포넌트의 소멸과 자원 정리 과정을 관찰합니다.</p>
      </header>

      <button type="button" className={S.toggleButton}>
        {'타이머 추가'}
      </button>

      <div role="region" aria-live="polite">
        <Timer />
      </div>
    </article>
  )
}

function Timer() {
  
  return (
    <div className={S.card}>
      <p className={S.info}>실시간 타이머</p>
      <output 
        className={S.timerDisplay} 
        aria-live="polite" 
        aria-atomic="true"
      >
        {0}s
      </output>
      <span className={S.info}>
        이 카드가 사라지면 콘솔 로그도 멈춰야 합니다.
      </span>
    </div>
  )
}
