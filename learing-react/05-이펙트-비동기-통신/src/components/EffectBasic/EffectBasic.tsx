import { useState, useEffect } from 'react'
import S from './EffectBasic.module.css'

async function wait(delay = 1000) {
  return new Promise((resolve) => setTimeout(resolve, delay))
}

export default function EffectBasic() {
  const [count, setCount] = useState(0)

  // 이펙트 (라이프 사이클)
  useEffect(() => {
    console.log(
      '[3] 이전, 현재 가상 DOM의 차이 비교: 변경된 부분 DOM에 반영 (Commit)',
    )

    console.log(
      '[4] 브라우저는 커밋 이후, 레이아웃을 재조정하고, 리페인트 (Paint)',
    )

    // 리액트와 분리된 설정(콜백) 함수 내부의 공간에 외부 시스템과 동기화하는 로직 작성
    document.title = `현재 카운터: ${count}`
  })

  // 이벤트 (인터랙션)
  const handleIncreament = async () => {
    console.log('[1] 상태 업데이트 요청 (Trigger)')
    await wait(1500)
    setCount((c) => c + 1)
  }

  console.log('[2] 상태를 변경한 후, 컴포넌트 다시 실행 (Render)')

  return (
    <section className={S.container}>
      <h2 className={S.title}>Effect 기초 학습</h2>

      <button
        type="button"
        className={S.counterButton}
        onClick={handleIncreament}
      >
        카운트 증가: {count}
      </button>

      <p className={S.statusText}>콘솔 로그를 통해 실행 순서를 확인해보세요.</p>
    </section>
  )
}
