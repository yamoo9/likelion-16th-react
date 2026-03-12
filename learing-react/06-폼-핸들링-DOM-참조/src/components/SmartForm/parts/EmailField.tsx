/* eslint-disable @typescript-eslint/no-unused-vars */
import { useId } from 'react'
import S from '../SmartForm.module.css'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface Props {
  value: string
  onChange: (val: string) => void
}

export default function EmailField({ value, onChange }: Props) {
  const filedId = useId()
  // TODO 1: 에러 메시지와 '필드 방문 여부'를 관리할 상태를 만드세요.
  

  const handleBlur = () => {
    // TODO 2: 사용자가 필드를 벗어나는 순간(Blur), 방문 여부를 true로 바꾸고 검증을 실행하세요.
    // 힌트: EMAIL_PATTERN 정규식을 활용하세요.

  }

  // TODO 3: '방문했고(isTouched)' + '에러가 있을 때'만 에러를 보여주도록 변수를 설정하세요.
  const showError = false // 이 부분을 완성하세요.

  return (
    <div className={S.field}>
      <label htmlFor={filedId} className={S.label}>
        이메일
      </label>
      <input
        id={filedId}
        type="email"
        placeholder="user@email.com"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        // TODO 4: onBlur 이벤트를 연결하고, 에러 상태에 따라 클래스와 aria 속성을 제어하세요.
        
        className={S.input}
      />

      {/* TODO 5: showError가 true일 때만 에러 메시지(p 태그)를 렌더링하세요. */}
      {/* <p role="alert" className={S.errorMessage}>
        {'에러 메시지'}
      </p> */}
    </div>
  )
}
