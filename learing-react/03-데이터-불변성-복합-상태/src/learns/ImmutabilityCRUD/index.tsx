import { useState } from 'react'
import S from './style.module.css'

// 카트(장바구니) 배열 안에 상품 객체를 추가할 건데 그 모양이 다음과 같아요.
//  (약속 = 타입스크립트의 [ 인터페이스 ] 선언)
// - id (고유한 식별자)
// - name (사과 이름)
// - count (사과 갯수)

interface Product {
  id: number
  name: string
  count: number
}

export default function ImmutabilityCRUD() {
  const [appleCart, setAppleCart] = useState<Product[]>([])

  // 추가(Add): 사과
  const handleAdd = () => {
    const newAppleProdcut: Product = {
      id: Date.now(),
      name: '애플',
      count: 1,
    }

    const nextCart = [newAppleProdcut, ...appleCart]
    setAppleCart(nextCart) // 상태 업데이트 트리거(리액트에 요청)
  }

  // 삭제(Delete): 사과를 삭제하는 기능
  const handleDelete = (deleteId: number) => {
    // 삭제할 id와 appleCart 내부의 아이템 중 id가 동일한 것을 제외한 나머지를 걸러라.
    const nextAppleCart = appleCart.filter((apple) => {
      if (apple.id !== deleteId) return true
      return false
    })

    setAppleCart(nextAppleCart)
  }

  // 수정(Update): 사과의 카운트 증가/감소 기능
  const handleUpdateCount = (id: number, amount: number) => {
    console.log(amount) // + 1 or - 1 (다음 상태: nextCart)

    // appleCart 배열 ({ id: number, name: string, count: number }[])
    // 리액트가 화면을 변경하려면?
    // 배열 복제하거나 또는 새로운 배열을 만들어서 다음 상태로 설정
    // 원본 배열을 불변(immutable) 유지하면서 새로운 배열을 만들려면? map 메서드 활용
    const nextAppleCart = appleCart.map((apple) => {
      if (apple.id === id) {
        return {
          ...apple,
          count: Math.max(1, apple.count + amount),
        }
      }

      return apple
    })

    setAppleCart(nextAppleCart)
  }

  console.log(appleCart)

  return (
    <section className={S.container}>
      <h2 className={S.title}>사과 바구니 (Apple Cart)</h2>
      <button type="button" className={S.addButton} onClick={handleAdd}>
        사과 추가하기
      </button>

      <ul className={S.itemList}>
        {appleCart.map((apple, index) => {
          const appleId = apple.id.toString().slice(10)
          return (
            <li key={index} data-id={apple.id} className={S.item}>
              <span className={S.info}>
                {apple.name} {appleId} (수량: {apple.count})
              </span>
              <div role="group" className={S.controls}>
                <button
                  type="button"
                  aria-label="애플 수량 증가"
                  className={S.countButton}
                  onClick={() => handleUpdateCount(apple.id, 1)}
                >
                  +
                </button>
                <button
                  type="button"
                  aria-label="애플 수량 감소"
                  className={S.countButton}
                  onClick={() => handleUpdateCount(apple.id, -1)}
                >
                  -
                </button>
                <button
                  type="button"
                  aria-label="애플 삭제"
                  className={S.deleteButton}
                  onClick={() => handleDelete(apple.id)}
                >
                  삭제
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
