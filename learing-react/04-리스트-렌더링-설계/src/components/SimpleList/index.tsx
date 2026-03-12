import { useState } from 'react'
import S from './style.module.css'

const INITIAL_SNACKS = [
  '감자칩',
  '초코바',
  '젤리',
  '쿠키',
  '팝콘',
  '나쵸',
  '오징어땅콩',
  '맛동산',
  '에이스',
  '홈런볼',
  '꼬깔콘',
  '포카칩',
  '프링글스',
  '고래밥',
  '칸쵸',
  '빼빼로',
  '양파링',
  '자갈치',
  '새우깡',
  '꿀꽈배기',
  '감자깡',
  '허니버터칩',
]

export default function SnackList() {
  // 추천 스낵 상태 관리
  const [snacks] = useState(INITIAL_SNACKS)

  return (
    <section className={S.container}>
      <h2 className={S.title}>오늘의 추천 스낵 ({snacks.length}종)</h2>

      {/* 리스트 렌더링 with Key */}
      <ul className={S.list}>
        {snacks.map((snack, index) => (
          <li key={index} className={S.item}>
            {snack}
          </li>
        ))}
      </ul>
    </section>
  )
}
