import { useImmer } from 'use-immer'
import S from './ShoppingCart.module.css'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  options: {
    amount: number
  }
}

const INITIAL_CART: CartItem[] = [
  {
    id: 'item-1',
    name: '기계식 키보드',
    price: 28100,
    quantity: 1,
    options: { amount: 10 },
  },
  {
    id: 'item-2',
    name: '게이밍 마우스',
    price: 25300,
    quantity: 1,
    options: { amount: 4 },
  },
]

export default function ShoppingCart() {
  const [cart, setCart] = useImmer(INITIAL_CART)

  // 파생된 상태 (장바구니 내부에 항목 포함 여부)
  const hasCartItems = cart.length > 0

  const updateQuantity = (
    itemId: CartItem['id'],
    delta: CartItem['quantity'],
  ) => {
    setCart((draft) => {
      const item = draft.find((item) => item.id === itemId)
      if (item) item.quantity = item.quantity + delta
    })
  }

  const deleteItem = (itemId: CartItem['id']) => {
    // if (confirm('정말로 삭제하시겠습니까?')) {
      setCart((draft) => {
        const deleteIndex = draft.findIndex((item) => item.id === itemId)
        if (deleteIndex > -1) draft.splice(deleteIndex, 1)
      })
    // }
  }

  const handleClearCart = () => {
    setCart([])
  }

  const handleRestoreCart = () => {
    setCart(INITIAL_CART)
  }

  return (
    <section className={S.container}>
      <h2 className={S.title}>장바구니 실습</h2>

      {/* 조건부 UI 렌더링 */}
      {hasCartItems ? (
        <ul className={S.itemList}>
          {cart.map(({ id, name, price, quantity, options: { amount } }) => {
            const isMinDisabled = quantity === 1
            const isMaxDisabled = quantity >= amount

            return (
              <li key={id} className={S.item}>
                <div className={S.info}>
                  <p className={S.name}>{name}</p>
                  <p className={S.price}>{price.toLocaleString()}원</p>
                </div>
                <div className={S.controls}>
                  <button
                    type="button"
                    className={S.button}
                    aria-label={`${name} 수량 감소`}
                    aria-disabled={isMinDisabled}
                    onClick={() => {
                      if (isMinDisabled) return
                      updateQuantity(id, -1)
                    }}
                  >
                    -
                  </button>
                  <output className={S.quantity}>{quantity}</output>
                  <button
                    type="button"
                    className={S.button}
                    aria-label={`${name} 수량 증가`}
                    aria-disabled={isMaxDisabled}
                    onClick={() => {
                      if (isMaxDisabled) return
                      updateQuantity(id, 1)
                    }}
                  >
                    +
                  </button>
                  <button
                    type="button"
                    className={S.deleteButton}
                    aria-label={`장바구니에서 ${name} 상품 제거`}
                    onClick={() => deleteItem(id)}
                  >
                    삭제
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      ) : (
        <p className={S.emptyMessage}>장바구니가 비어 있습니다.</p>
      )}

      {/* 조건부 UI 렌더링: '장바구니 비우기' / '장바구니 복구하기' */}
      {
        hasCartItems ? (
          <button type="button" className={S.transitionButton} onClick={handleClearCart}>
            장바구니 비우기
          </button>
        ) : (
          <button type="button" className={S.transitionButton} onClick={handleRestoreCart}>
            장바구니 복구하기
          </button>
        )
      }
    </section>
  )
}
