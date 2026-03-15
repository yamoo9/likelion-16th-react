interface Product {
  id: string
  name: string
  price: number
  quantity: number
  options: {
    color: string
    inStock: boolean
  }
}

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'product-1773535432015',
    name: '맥북 프로 14 M3',
    price: 2690000,
    quantity: 1,
    options: { color: '내추럴 티타늄', inStock: true },
  },
  {
    id: 'product-1773535481456',
    name: '애플 워치 울트라 2',
    price: 1149000,
    quantity: 0,
    options: { color: '오렌지 오션', inStock: false },
  },
  {
    id: 'product-1773535492567',
    name: '스튜디오 디스플레이',
    price: 2090000,
    quantity: 0,
    options: { color: '스탠다드 글래스', inStock: true },
  },
  {
    id: 'product-1773535503678',
    name: '매직 키보드 (Touch ID)',
    price: 249000,
    quantity: 1,
    options: { color: '스페이스 그레이', inStock: true },
  },
]
