import type { Product } from '../type/product'
import { getPexelsImage } from '../util/getPexelsImage'
import S from './ProductCard.module.css'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { id, name, price, isSoldOut } = product

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
}