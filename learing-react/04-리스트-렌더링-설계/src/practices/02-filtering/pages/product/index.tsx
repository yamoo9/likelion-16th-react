import ProductList from '../../components/ProductList'
import { MOCK_DATA } from '../../data/mock'
import type { Product } from '../../data/types'
import S from './style.module.css'


export default function ProductPage() {
  const products: Product[] = MOCK_DATA
  
  return (
    <section className={S.container}>
      <header>
        <h1>상품 목록</h1>

        {/* 상품 카테고리 필터 */}
      </header>

      {/* 상품 목록 */}
      <ProductList products={products} />
    </section>
  )
}
