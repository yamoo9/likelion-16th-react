import type { Product } from '../data/types'
import S from './ProductCard.module.css'

interface Props {
  product: Product
}

export function ProductCard({ product }: Props) {
  const { id, name, price, imageUrl } = product
  const productId = `prod-title-${id}`

  return (
    <article className={S.card} aria-labelledby={productId}>
      <div className={S.imageWrapper}>
        <img src={imageUrl} alt="" loading="lazy" />
      </div>
      <div className={S.info}>
        <h3 id={productId} className={S.name}>
          {name}
        </h3>
        <div className={S.priceWrapper}>
          <span className="sr-only">판매 가격: </span>
          <data value={price} className={S.price}>
            {price.toLocaleString()}원
          </data>
        </div>
      </div>
    </article>
  )
}
