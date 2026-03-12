import { useState } from 'react'
import type { Product } from './type/product'
import productsData from './data/products.json'
import ProductCard from './parts/ProductCard'
import S from './style.module.css'

export default function ProductList() {
  const [products] = useState<Product[]>(productsData)

  return (
    <section className={S.container}>
      <h2 className={S.title}>인기 상품 목록</h2>
      <div className={S.grid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
