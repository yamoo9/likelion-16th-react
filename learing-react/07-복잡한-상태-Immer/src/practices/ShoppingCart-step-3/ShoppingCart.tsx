import { useImmer } from 'use-immer'
import S from './ShoppingCart.module.css'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  options: {
    amount: number
    checked: boolean
  }
}

const INITIAL_CART: CartItem[] = [
  {
    id: 'item-1',
    name: '기계식 키보드',
    price: 28100,
    quantity: 1,
    options: {
      amount: 10,
      checked: false,
    },
  },
  {
    id: 'item-2',
    name: '게이밍 마우스',
    price: 25300,
    quantity: 1,
    options: {
      amount: 4,
      checked: false,
    },
  },
]

export default function ShoppingCart() {
  // 상태 (리액트를 작동하게 하는 데이터)
  const [cart, setCart] = useImmer(INITIAL_CART)

  // 파생된 상태 (상태에 의존해 렌더링 마다 다시 계산된 값)
  const cartItemCount = cart.length
  const hasCartItems = cartItemCount > 0
  // 체크된 상품 항목을 필터링
  const checkedItems = cart.filter(({ options }) => options.checked)
  const checkedItemsCount = checkedItems.length
  const isAllChecked = checkedItemsCount === cartItemCount

  // 누산된 값(accumulator value) = 체크된 모든 상품의 가격 * 수량의 계산된 총금액 (number)
  const totalPrice = checkedItems.reduce((total, { price, quantity }) => total + price * quantity, 0)

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
    setCart((draft) => {
      const deleteIndex = draft.findIndex((item) => item.id === itemId)
      if (deleteIndex > -1) draft.splice(deleteIndex, 1)
    })
  }

  const toggleItem = (itemId: CartItem['id']) => {
    setCart((draft) => {
      // 체크된 상태를 전환할 아이템 찾기
      const item = draft.find((item) => item.id === itemId)
      if (item) item.options.checked = !item.options.checked
    })
  }

  const handleClearCart = () => {
    setCart([])
  }

  const handleRestoreCart = () => {
    setCart(INITIAL_CART)
  }

  const handleAllToggle = () => {
    setCart((draft) => {
      draft.forEach((item) => {
        item.options.checked = !isAllChecked
      })
    })
  }

  return (
    <section className={S.container}>
      <h2 className={S.title}>장바구니 실습</h2>

      {/* 조건부 UI 렌더링 */}
      {hasCartItems ? (
        <>
          <header className={S.header}>
            <input
              type="checkbox"
              id="all-checked"
              className={S.checkbox}
              checked={isAllChecked}
              onChange={handleAllToggle}
            />
            <label htmlFor="all-checked">
              전체 선택 (상품 {cartItemCount}개)
            </label>
          </header>
          <ul className={S.itemList}>
            {cart.map(
              ({ id, name, price, quantity, options: { amount, checked } }) => {
                const isMinDisabled = quantity === 1
                const isMaxDisabled = quantity >= amount

                return (
                  <li key={id} className={S.item}>
                    <input
                      type="checkbox"
                      id={id}
                      className={S.checkbox}
                      checked={checked}
                      onChange={() => toggleItem(id)}
                    />
                    <label htmlFor={id} className={S.info}>
                      <span className={S.name}>{name}</span>
                      <span className={S.price}>
                        {price.toLocaleString()}원
                      </span>
                    </label>
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
              },
            )}
          </ul>
          <footer className={S.footer} aria-live="polite">
            <span className={S.totalLabel}>결제 예정 금액</span>
            <output className={S.totalPrice}>{totalPrice.toLocaleString()}원</output>
          </footer>
        </>
      ) : (
        <p className={S.emptyMessage}>장바구니가 비어 있습니다.</p>
      )}

      {/* 조건부 UI 렌더링: '장바구니 비우기' / '장바구니 복구하기' */}
      {hasCartItems ? (
        <button
          type="button"
          className={S.transitionButton}
          onClick={handleClearCart}
        >
          장바구니 비우기
        </button>
      ) : (
        <button
          type="button"
          className={S.transitionButton}
          onClick={handleRestoreCart}
        >
          장바구니 복구하기
        </button>
      )}
    </section>
  )
}
