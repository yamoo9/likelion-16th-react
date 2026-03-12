import { useState } from 'react'
import type { Product } from './type/product'
import productsData from './data/products.json'
import { getPexelsImage } from './util/getPexelsImage'
import S from './style.module.css'

export default function ProductList() {
  const [products] = useState<Product[]>(productsData)

  return (
    <section className={S.container}>
      <h2 className={S.title}>인기 상품 목록</h2>
      <div className={S.grid}>
        {products.map((product) => {
          const { isSoldOut, price, name, id } = product
          return (
            <article key={id} className={S.card}>
              <img src={getPexelsImage(id)} alt="" className={S.image} />

              <div className={S.content}>
                <h3 className={S.name}>{name}</h3>
                <span className={S.price}>{price.toLocaleString()}원</span>
                {isSoldOut && <strong className={S.soldOut}>(품절)</strong>}
              </div>

              <button
                type="button"
                className={S.button}
                aria-disabled={isSoldOut}
              >
                {isSoldOut ? '입고 알림 신청' : '장바구니 담기'}
              </button>
            </article>
          )
        })}
      </div>
    </section>
  )
}
