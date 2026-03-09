import { useState, type MouseEvent } from 'react'
import S from './style.module.css'

export default function EventHandler() {
  // 컴포넌트 상태(기억되는 데이터 값) 관리
  const [count, setCount] = useState(0)

  // 화살표 함수 식 (이벤트 객체를 사용할 경우, 타입 지정 필요)
  const handleIncreaseCount = (e: MouseEvent<HTMLButtonElement>) => {
    console.log(e.type + ' 이벤트 발동!')
    const nextCount = count + 1
    setCount(nextCount)
  }

  const handlePrintMessage = (message: string) => {
    alert(message)
  }

  return (
    <section className={S.container}>
      <h2 className={S.title}>이벤트 핸들링 실습</h2>
      <div role="group" className={S.buttonGroup}>
        <button
          type="button"
          className={S.button}
          // TODO 2: JSX에서 함수 몸체 내부에 변수에 함수 값 할당
          onClick={handleIncreaseCount}
          onDoubleClick={() => handlePrintMessage('오늘 수업 끝!')}
        >
          클릭(Click) 이벤트 ({count})
        </button>
        <button
          type="button"
          className={`${S.button} ${S.secondary}`}
          // TODO 1: JSX 내부에서 인라인 이벤트 핸들러 추가
          onMouseEnter={(e) => {
            console.log(`${e.type} 이벤트 발동!`)
          }}
          onMouseLeave={(e) => {
            console.log(e.type + ' 이벤트 발동!')
          }}
        >
          호버(MouseEnter) 이벤트
        </button>
      </div>
    </section>
  )
}
