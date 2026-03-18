import { useId, useState } from 'react'
import S from '../SmartForm.module.css'
import ShowErrorOrInfoMessage from './ShowErrorOrInfoMessage'
import { createValidator } from '../util'

// 이메일 검사를 위한 정규식
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// 유효성 검사 함수 생성
const validateEmail = createValidator(
  // 필수 입력 메시지
  '이메일 입력이 필요합니다.', 
  // 사용자 정의 유효성 검사
  (value) => 
      EMAIL_PATTERN.test(value)
        ? ''
        : '유효한 이메일 주소를 입력해야 합니다.'
)

interface Props {
  value: string
  onChange: (val: string) => void
}

export default function EmailField({ value, onChange }: Props) {
  const filedId = useId()
  const messageId = useId()
  const [isTouched, setIsTouched] = useState(false)
  const [error, showError] = validateEmail(value, isTouched)

  return (
    <div className={S.field}>
      <label htmlFor={filedId} className={S.label}>
        이메일
      </label>
      <input
        id={filedId}
        type="email"
        placeholder="user@email.com"
        className={showError ? S.inputError : S.input}
        aria-invalid={showError ? 'true' : 'false'}
        aria-describedby={messageId}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => setIsTouched(true)}
        value={value}
      />
      <ShowErrorOrInfoMessage
        id={messageId}
        hint="올바른 이메일 주소 입력"
        error={error}
      />
    </div>
  )
}
