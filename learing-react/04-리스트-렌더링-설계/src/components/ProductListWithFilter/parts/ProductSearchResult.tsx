import type { Product } from '../type/product'
import ProductCard from './ProductCard'
import S from './ProductSearchResult.module.css'

interface Props {
  products: Product[]
  searchQuery: string
}

// Stateless: 상태가 없는 컴포넌트
// 비즈니스 로직 없이 화면에 그림을 그리는 컴포넌트 (마크업, 스타일링 담당)
export default function ProductSearchResult({
  products,
  searchQuery = '',
}: Props) {
  if (products.length === 0) {
    return (
      <div className={S.noResult} aria-live="polite">
        <p className={S.message}>
          <strong>"{searchQuery}"</strong>에 대한 검색 결과가 없습니다.
        </p>
        <p className={S.subMessage}>입력하신 단어가 정확한지 확인해 주세요.</p>
      </div>
    )
  }

  return (
    <div className={S.grid}>
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  )
}
