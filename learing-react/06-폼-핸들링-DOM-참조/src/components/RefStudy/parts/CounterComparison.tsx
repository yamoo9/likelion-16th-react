import { useState } from 'react'
import S from '../RefStudy.module.css'

export default function CounterComparison() {
  const [countState, setCountState] = useState(0)
  
  // TODO 1: Ref 생성 (초기값 0)

  const handleRefIncrement = () => {
    // TODO 2: Ref 값 증가 로직 작성 (콘솔로 확인)
    
  }

  return (
    <section className={S.section}>
      <h3 className={S.title}>State vs Ref 비교</h3>
      <div className={S.display}>
        <div>
          State ( 렌더링 <span aria-label="처리">⭕️</span> ){' '}
          <strong>{countState}</strong>
        </div>
        <div>
          Ref ( 렌더링 <span aria-label="안함">❌</span> ){' '} 
          <strong>{'Ref 현재 값'}</strong>
        </div>
      </div>
      <div className={S.inputGroup}>
        <button type="button" onClick={() => setCountState((c) => c + 1)}>
          State 증가
        </button>
        <button type="button" onClick={handleRefIncrement}>
          Ref 증가
        </button>
      </div>
    </section>
  )
}