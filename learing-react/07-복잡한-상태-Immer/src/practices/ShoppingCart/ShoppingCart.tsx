import S from './ShoppingCart.module.css'

const cart = [
  { id: 1, name: '기계식 키보드', price: 28100, quantity: 1 },
  { id: 2, name: '게이밍 마우스', price: 25300, quantity: 1 },
]

export default function ShoppingCart() {
  console.log(cart)

  return (
    <section className={S.container}>
      <h2 className={S.title}>장바구니 실습 (수량 조절)</h2>

      <ul className={S.itemList}>
        <li className={S.item}>
          <div className={S.info}>
            <p className={S.name}>{'상품 이름'}</p>
            <p className={S.price}>{'상품 가격'}원</p>
          </div>

          <div className={S.controls}>
            <button type="button" className={S.button}>
              -
            </button>
            <span className={S.quantity}>{'상품 수량'}</span>
            <button type="button" className={S.button}>
              +
            </button>
          </div>
        </li>
      </ul>
    </section>
  )
}
