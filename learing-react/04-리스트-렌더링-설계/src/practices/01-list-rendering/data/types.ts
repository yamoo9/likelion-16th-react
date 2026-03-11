export interface Product {
  id: string
  name: string
  price: number
  imageUrl: string
  isSoldOut: boolean
  category: 'music' | 'digital' | 'home' | 'fashion'
}

export const CATEGORY_MAP = {
  all: '전체',
  music: '악기',
  digital: '디지털',
  home: '홈 & 데코',
  fashion: '패션',
} as const

export type CategoryKey = keyof typeof CATEGORY_MAP
// typeof     : CATEGORY_MAP이라는 실제 데이터(객체)를 분석해서 타입(설계도)으로 변환합니다.
// keyof      : 그 타입 중에서 '키(이름표)'들만 쏙쏙 뽑아옵니다.
// 결과        : all | music | digital | home | fashion 중 하나만 허용하는 타입이 됩니다.
// 사용하는 이유 : 오타 방지용입니다. 'music'을 'musice'라고 잘못 쓰는 실수를 즉시 잡아줍니다.