import { useId, useState } from 'react'
import S from '../SmartForm.module.css'
import ShowErrorOrInfoMessage from './ShowErrorOrInfoMessage'

// 이메일 검사를 위한 정규식
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface Props {
  value: string
  onChange: (val: string) => void
}

export default function EmailField({ value, onChange }: Props) {
  const filedId = useId()
  const messageId = useId()

  const [isTouched, setIsTouched] = useState(false)

  const getErrorMessage = () => {
    if (!isTouched) return ''
    if (!value) return '이메일을 입력하세요.'
    return EMAIL_PATTERN.test(value) ? '' : '유효한 이메일이 아닙니다.'
  }

  const error = getErrorMessage()
  const showError = error !== ''

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
