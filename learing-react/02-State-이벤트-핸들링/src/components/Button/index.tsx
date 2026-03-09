import type { ReactNode } from 'react'
import S from './style.module.css'

interface ButtonProps {
  children: ReactNode
  isDisabled?: boolean
}

function Button({ isDisabled = false, children }: ButtonProps) {
  /**
   * 컴포넌트 속성(Props) 설계
   * ✅ 속성 타입 정의 (인라인 → 인터페이스)
   * ✅ 속성 구조 분해 할당
   */

  // 구조 분해 할당 (props는 객체)
  // const { children } = props
  // const isDisabled = false

  return (
    <button
      type="button"
      className={S.button}
      onClick={() => alert('모든 사용자가 행복해요!!! 🌈')}
      aria-disabled={isDisabled}
    >
      {children}
    </button>
  )
}

export default Button
