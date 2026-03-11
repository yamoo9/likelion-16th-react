import { useState } from 'react'
import S from './style.module.css'
import { log } from '@/utils'

export default function Immutability() {
  const [items, setItems] = useState(['하나', '둘', '셋'])

  // 직접 수정(push) 방식
  const handleMutation = () => {
    console.log('뮤테이션(변이)')

    // 원본 배열을 사용해 직접 수정
    items.push('넷', '다섯', '여섯')
    log(`원본 배열 데이터에 새로운 항목이 추가되었습니다. ${items}`)

    // 리액트에게 상태 업데이트와 렌더 요청
    // 상태 업데이트 함수인 setItems가 실행되면 상태가 변경되고,
    // 이를 감지해 브라우저 화면을 갱신한다.

    // 리액트가 꿈쩍도 안하는 이유!!
    // 메모리 힙(heap) : 객체형 데이터 저장 (참조 주소)
    setItems(items) // 동일 참조! (메모리 힙 주소가 동일)
    // 리액트가 화면을 바꾸는 원리
    // - 새로운 상태 데이터 값이 이전과 달라야 한다.
    // - 리액트는 객체의 경우, 힙(Heap) 주소만 본다.
  }

  // 새로운 배열 생성(spread) 방식
  const handleKeepImmutable = () => {
    console.log('불변성(Immutability) 유지')
    // 원본 배열이 아니라, 복제된 배열을 사용

    // 배열을 복제하는 메서드? array.slice()
    // const nextItems = items.slice() // 배열 복제 (메모리 상 다른 힙 주소)
    // nextItems.push('넷', '다섯', '여섯')
    // console.log({ items })
    // console.log({ nextItems })

    // 다른 참조 주소라면? 리액트는 상태가 변경되었다고 생각합니다.
    // 그러므로 화면을 갱신하려 시도하겠죠.

    // 배열을 복제하는 구문(문법)? [...array]
    // const nextItems = [...items, '넷', '다섯', '아홉']
    // setItems(nextItems)

    setItems([...items, '넷', '다섯', '아홉'])
  }

  return (
    <section className={S.container}>
      <h2 className={S.title}>불변성(Immutability) 관리 실습</h2>

      <div role="group" className={S.buttonGroup}>
        <button type="button" className={S.button} onClick={handleMutation}>
          직접 수정 (push)
        </button>
        <button
          type="button"
          className={`${S.button} ${S.primary}`}
          onClick={handleKeepImmutable}
        >
          새 배열 생성 (Spread)
        </button>
      </div>

      <div className={S.listWrapper}>
        <ul className={S.itemList}>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
