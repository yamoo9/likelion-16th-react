import { useState } from 'react'
import S from './style.module.css'

interface Product {
  id: number
  name: string
  price: number
  isSoldOut: boolean
}

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 4207892,
    name: '시그니처 세라믹 화병 (샌드 베이지)',
    price: 48000,
    isSoldOut: false,
  },
  {
    id: 210528,
    name: '미니멀리스트 알루미늄 탁상시계',
    price: 32500,
    isSoldOut: false,
  },
  {
    id: 6636283,
    name: '무드 인센스 홀더 (매트 블랙)',
    price: 19000,
    isSoldOut: true,
  },
  {
    id: 1248583,
    name: '프리미엄 린넨 텍스처 쿠션',
    price: 28000,
    isSoldOut: false,
  },
  {
    id: 212236,
    name: '스테인리스 스틸 드립 포트',
    price: 55000,
    isSoldOut: false,
  },
  {
    id: 1638336,
    name: '북유럽풍 원목 트레이 (오크)',
    price: 42000,
    isSoldOut: false,
  },
]

export default function ProductList() {
  const [products] = useState(INITIAL_PRODUCTS)

  return (
    <section className={S.container}>
      <h2 className={S.title}>인기 상품 목록</h2>
      <div className={S.grid}>
        {products.map((product) => {
          const { isSoldOut, price, name, id } = product
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
        })}
      </div>
    </section>
  )
}

const getPexelsImage = (id: number, width: number = 800) => {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`
}
