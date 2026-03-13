import { useState } from 'react'
import ProductSearchResult from './parts/ProductSearchResult'
import ProductSearch from './parts/ProductSearch'
import productsData from './data/products.json'
import type { Product } from './type/product'
import S from './style.module.css'

const INITIAL_PRODUCTS: Product[] = productsData

export default function ProductListWithFilter() {
  // 화면에 렌더링할 데이터 관리 상태 선언
  const [products] = useState(INITIAL_PRODUCTS)

  // 검색어 관리할 상태 선언
  const [searchQuery, setSearchQuery] = useState('')

  // 상품 데이터를 사용자가 검색한 키워드에 따라 필터링된다면?
  // ProductSearchResult 컴포넌트는 필터링된 데이터로 화면을 그릴 것이다.
  // - 자바스크립트 '배열'을 다루는 능력 (filter)
  // - '파생된 상태(Derived State)'에 대한 이해
  // - 리액트의 반응성 데이터 (화면을 변경할 수 있는 힘을 가진 데이터: State, Props)
  // - 반응성 데이터에 의해 반응하는 데이터 (Derived State : 리액트의 상태가 바뀌면 다시 계산된 값)

  const filteredProducts = products.filter((product) => {
    return product.name.toLowerCase().includes(searchQuery.toLowerCase())
  })

  return (
    <section className={S.container}>
      <h2 className={S.title}>인기 상품 목록</h2>
      <ProductSearch
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <ProductSearchResult
        products={filteredProducts}
        searchQuery={searchQuery}
      />
    </section>
  )
}
