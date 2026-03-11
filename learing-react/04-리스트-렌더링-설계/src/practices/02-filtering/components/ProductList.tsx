import type { Product } from '../data/types'
import { ProductCard } from './ProductCard'
import S from './ProductList.module.css'

interface ProductListProps {
  products?: Product[]
}

export default function ProductList({ products = [] }: ProductListProps) {
  if (products.length  === 0) {
    return (
      <p className={S.empty}>해당 카테고리에 상품이 없습니다.</p>
    )
  }

  return (
    <div className={S.list}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
