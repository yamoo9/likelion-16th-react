import { useState } from 'react'
import ProductSearchResult from './parts/ProductSearchResult'
import ProductSearch from './parts/ProductSearch'
import productsData from './data/product.json'
import type { Product } from './type/product'
import S from './style.module.css'

const INITIAL_PRODUCTS: Product[] = productsData

export default function ProductList() {
  const [products] = useState(INITIAL_PRODUCTS)

  return (
    <section className={S.container}>
      <h2 className={S.title}>인기 상품 목록</h2>
      <ProductSearch />
      <ProductSearchResult products={products} />
    </section>
  )
}
