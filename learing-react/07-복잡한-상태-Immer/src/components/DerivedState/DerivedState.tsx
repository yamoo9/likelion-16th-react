import { useImmer } from 'use-immer'
import { INITIAL_PRODUCTS } from './data/products'
import S from './DerivedState.module.css'

/**
 * -------------------------------------------------
 * 상태(State)인지 아닌지 판단하는 3단계 질문
 * -------------------------------------------------
 * 1. 부모로부터 Props로 전달되는 데이터인가요?
 * 2. 시간이 지나도 변경되지 않는 데이터인가요?
 * 3. 다른 State나 Prop으로 계산 가능한가요?
 *
 *    그렇다면 관리할 상태(State)가 아닙니다.
 * -------------------------------------------------
 */

export default function DerivedState() {
  // Immer 라이브러리를 사용해 상태를 관리해보세요.
  const [products, setProducts] = useImmer(INITIAL_PRODUCTS)

  // 수량 업데이트 함수 ------------------------------------------------------

  const updateQuantity = (id: string, delta: number) => {
    setProducts((draft) => {
      const product = draft.find((item) => item.id === id)
      if (product) {
        if (!product.options.inStock) return
        product.quantity = Math.max(1, product.quantity + delta)
      }
    })

    // const nextProducts = products.map((product) => {
    //   if (product.id !== id || !product.options.inStock) return product

    //   const nextProduct = {
    //     ...product,
    //     quantity: Math.max(1, product.quantity + delta),
    //   }

    //   return nextProduct
    // })

    // setProducts(nextProducts)
  }

  // 총 상품 가격 상태 ------------------------------------------------------

  // 파생된 상태([Derived State] State에 의존하는 데이터: 렌더링 할 때마다 다시 계산된 값)
  const totalPrice = products.reduce((sum, { price, quantity }) => sum + price * quantity, 0)
  // ❌ 필요하지 않은 상태와 이펙트 사용 권장 안함! (불필요한 렌더링 유발)

  // 총 개수 상태 ----------------------------------------------------------
  
  // 파생된 상태
  const totalCount = products.length

  return (
    <section className={S.container}>
      <h2 className={S.title}>장바구니 (파생된 상태의 필요성 체득!)</h2>

      <ul className={S.itemList} aria-label="장바구니 품목">
        {products.map((product) => {
          const { id, name, price, options, quantity } = product
          const hasInStock = options.inStock
          const isDisabled = quantity === 1

          const currency = price.toLocaleString()

          const productLabel = `${name} 재고 ${hasInStock ? '있음' : '없음'} (${currency}원)`

          const productStyles = hasInStock
            ? undefined
            : { textDecoration: 'line-through', opacity: 0.45 }

          return (
            <li key={id} className={S.item}>
              <span aria-label={productLabel} style={productStyles}>
                {name} ({currency}원)
              </span>
              <div className={S.controls}>
                <button
                  type="button"
                  className={S.button}
                  onClick={() => updateQuantity(id, -1)}
                  aria-disabled={!hasInStock || isDisabled}
                  aria-label={`${name} 수량 감소`}
                >
                  -
                </button>
                <span aria-live="polite">{quantity}개</span>
                <button
                  type="button"
                  className={S.button}
                  onClick={() => updateQuantity(id, 1)}
                  aria-disabled={!hasInStock}
                  aria-label={`${name} 수량 증가`}
                >
                  +
                </button>
              </div>
            </li>
          )
        })}
      </ul>

      <div className={S.summary}>
        <p>
          총 품목 수: <strong>{totalCount}개</strong>
        </p>
        <p>
          총 결제 금액: <strong>{totalPrice.toLocaleString()}원</strong>
        </p>
      </div>
    </section>
  )
}
