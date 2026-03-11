import type { ReactNode } from 'react'
import S from './style.module.css'

interface ButtonProps {
  type?: 'submit' | 'reset' | 'button'
  children: ReactNode
  isDisabled?: boolean
  onNoti?: () => void /* return undefined */
}

function Button({
  type = 'button',
  isDisabled = false,
  onNoti,
  children,
}: ButtonProps) {
  /**
   * 컴포넌트 속성(Props) 설계
   * ✅ 속성 타입 정의 (인라인 → 인터페이스)
   * ✅ 속성 구조 분해 할당
   */

  // 구조 분해 할당 (props는 객체)
  // const { children } = props
  // const isDisabled = false

  const handleClick = () => {
    // 특정 조건이 참이되면 함수를 종료
    if (isDisabled) return

    console.log('clicked button')
    // 옵셔널 체이닝 (Optional Chaining)
    // - onNoti가 함수 타입이야? 함수 타입이면 실행해!
    // - 함수 타입아니면 아무 것도 하지마!
    onNoti?.()

    // 위 코드와 아래 코드는 동일하게 작동
    // if (typeof onNoti === 'function') {
    //   onNoti()
    // }
  }

  return (
    <button
      type={type}
      className={S.button}
      onClick={handleClick}
      aria-disabled={isDisabled}
    >
      {children}
    </button>
  )
}

export default Button
