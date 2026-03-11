import type { Product } from '../type/product'
import { getPexelsImage } from '../util/getPexelImage'
import S from './ProductCard.module.css'

type ProductCardProps = Product & {}

export default function ProductCard(props: ProductCardProps) {
  const { id, isSoldOut, name, price } = props

  return (
    <article key={id} className={S.card}>
      <img src={getPexelsImage(id)} alt="" className={S.image} />

      <div className={S.content}>
        <h3 className={S.name}>{name}</h3>
        <span className={S.price}>{price.toLocaleString()}원</span>
        {isSoldOut && <strong className={S.soldOut}>(품절)</strong>}
      </div>

      <button type="button" className={S.button} aria-disabled={isSoldOut}>
        {isSoldOut ? '입고 알림 신청' : '장바구니 담기'}
      </button>
    </article>
  )
}
