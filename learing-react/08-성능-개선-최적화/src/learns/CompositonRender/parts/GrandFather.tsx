import { useState } from 'react'
import grandFatherImage from '@/assets/icons/grand-father.png'
import S from './style.module.css'

// 렌더링 지연 시간(ms)
export const blockThreadTime = 0.5

const iconSize = 22

export default function GrandFather({ children }: React.PropsWithChildren) {
  const [count, setCount] = useState(0)

  console.log('%cGrandFather 렌더링', 'color: #349bf0')

  return (
    <section className={S.container}>
      <div className={S.grandFather}>
        <h2 className={S.title}>
          <img
            src={grandFatherImage}
            alt=""
            width={iconSize}
            height={iconSize}
          />
          그랜 파더 카운트: {count}
        </h2>
        <button
          type="button"
          aria-label="카운트 1증가"
          onClick={() => setCount(count + 1)}
        >
          카운트 ↑
        </button>
        
        {children}
      </div>
    </section>
  )
}
