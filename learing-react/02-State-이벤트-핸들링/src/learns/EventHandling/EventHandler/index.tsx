import { useState, type MouseEvent } from 'react'
import S from './style.module.css'

export default function EventHandler() {
  // 컴포넌트 상태(기억되는 데이터 값) 관리
  const [count, setCount] = useState(0)

  // 화살표 함수 식 (이벤트 객체를 사용할 경우, 타입 지정 필요)
  const handleIncreaseCount = (e: MouseEvent<HTMLButtonElement>) => {
    console.log('버블링', e.eventPhase)
    console.log(e.type + ' 이벤트 발동!')
    const nextCount = count + 1
    setCount(nextCount)
  }

  // 버전 1. 함수 몸체(body) 영역의 일반 함수 매개변수를 설정할 경우
  // function logMessage(message: string) {
  //   console.log(message)
  // }

  // 버전 2. 클로저(Closure) 활용
  //        화살표 함수 구문 사용
  const makeClickHandler = (message: string) => (e: MouseEvent<HTMLButtonElement>) => {
    console.log('캡쳐링', e.eventPhase)
    console.log(message)
  }

  // 함수 선언 방식의 클로저 활용
  // function makeClickHandler(message: string) {
  //   return function handleClick(e: MouseEvent<HTMLButtonElement>) {
  //     console.log('캡쳐링', e.eventPhase)
  //     console.log(message)
  //   }
  // }

  const message = '오늘 하루도 행복하게 시작합시다! 🍀'

  return (
    <section className={S.container}>
      <h2 className={S.title}>이벤트 핸들링</h2>
      <div role="group" className={S.buttonGroup}>
        <button
          type="button"
          className={S.button}
          // TODO 2: JSX에서 함수 몸체 내부에 변수에 함수 값 할당
          onClick={handleIncreaseCount}
          // TODO 3-1: 버전1. JSX에서 이벤트 핸들러에 메시지를 전달
          // onClickCapture={(/* 인라인 이벤트 핸들러 */) => {
          //   console.log('캡쳐링')
          //   logMessage('오늘 수업 시작합니다!')
          // }}
          // TODO 3-2: 버전2. 클로저를 활용할 경우
          onClickCapture={makeClickHandler(message)}
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
