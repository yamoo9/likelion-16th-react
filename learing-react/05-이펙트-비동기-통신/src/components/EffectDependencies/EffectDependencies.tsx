import S from './EffectDependencies.module.css'

export default function EffectDependencies() {
  // 상태 선언
  // - 카운트 상태
  // - 텍스트 상태
  // - 마운트 상태

  // 이펙트 설정

  return (
    <article className={S.container}>
      <header className={S.display}>
        <h2>의존성 배열 학습</h2>
        <p className={S.description}>실시간 카운트 상태를 확인하세요.</p>
        <output className={S.countOutput} aria-live="polite" aria-atomic="true">
          {0}
        </output>
      </header>

      <div className={S.controls}>
        <button
          type="button"
          className={S.counterButton}
          aria-label="카운트 1 증가"
        >
          카운트 업!
        </button>

        <div className={S.field}>
          <label htmlFor="effect-input" className={S.label}>
            의존성 테스트 입력창
          </label>
          <input
            id="effect-input"
            type="text"
            className={S.input}
            placeholder="여기에 타이핑해도 Case 3은 실행되지 않습니다."
            aria-describedby="input-help"
          />
          <p id="input-help" className="sr-only">
            이 입력창의 변화는 특정 의존성 배열이 설정된 Effect를 트리거하지
            않습니다.
          </p>
        </div>
      </div>

      <footer className={S.logBox} aria-label="상태 로그">
        <p>콘솔창(F12)을 확인하며 Effect의 동작을 관찰하세요.</p>
        <p>
          현재 입력 내용:
          <ins className={S.textHighlight}>{'입력 대기 중...'}</ins>
        </p>
      </footer>
    </article>
  )
}
