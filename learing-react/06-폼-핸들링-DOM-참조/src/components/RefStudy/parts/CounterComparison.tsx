import S from '../RefStudy.module.css'

// --------------------------------------------------------
// 실습 가이드
// --------------------------------------------------------
// 1. State 생성 (초기값 0)
// 2. State 값 증가 로직을 포함하는 핸들러 작성
// 3. Ref 생성 (초기값 0)
// 4. Ref 값 증가 로직을 포함하는 핸들러 작성 (콘솔로 결과 확인)
// --------------------------------------------------------

export default function CounterComparison() {
  
  return (
    <section className={S.section}>
      <h3 className={S.title}>State vs Ref 비교</h3>
      <div className={S.display}>
        <div>
          State ( 렌더링 <span aria-label="처리">⭕️</span> ){' '}
          <strong>{'상태 값'}</strong>
        </div>
        <div>
          Ref ( 렌더링 <span aria-label="안함">❌</span> ){' '}
          <strong>{'참조 값'}</strong>
        </div>
      </div>
      <div className={S.inputGroup}>
        <button type="button" className={S.button}>
          State 증가
        </button>
        <button type="button" className={S.button}>
          Ref 증가
        </button>
      </div>
    </section>
  )
}
