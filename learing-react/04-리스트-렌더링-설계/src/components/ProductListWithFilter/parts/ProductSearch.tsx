import S from './ProductSearch.module.css'

interface ProductSearchProps {
  searchQuery?: string
  setSearchQuery?: (nextSearchQuery: string) => void
}

export default function ProductSearch({
  searchQuery = '',
  setSearchQuery = () => {},
}: ProductSearchProps) {
  return (
    <search role="search" className={S.searchWrapper}>
      <label htmlFor="product-search" className={S.label}>
        상품 검색
      </label>
      <input
        id="product-search"
        type="search"
        className={S.input}
        placeholder="찾는 상품명을 입력하세요"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value.trim())}
      />
    </search>
  )
}
