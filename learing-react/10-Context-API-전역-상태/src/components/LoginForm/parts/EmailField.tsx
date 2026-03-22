import { useId, useState } from 'react'
import { createValidator } from '@/util'
import { EMAIL_PATTERN } from '../patterns'
import ShowErrorOrInfoMessage from './ShowErrorOrInfoMessage'
import S from '../style.module.css'

const validateEmail = createValidator('이메일 입력이 필요합니다.', (value) =>
  new RegExp(EMAIL_PATTERN).test(value) ? '' : '올바른 이메일 형식이 아닙니다.',
)

interface Props {
  value: string
  onChange: (val: string) => void
}

export default function EmailField({ value, onChange }: Props) {
  const fieldId = useId()
  const messageId = useId()
  const [isTouched, setIsTouched] = useState(false)
  const [error, showError] = validateEmail(value, isTouched)

  return (
    <div className={S.field}>
      <label htmlFor={fieldId} className={S.label}>
        이메일
      </label>
      <input
        id={fieldId}
        type="email"
        placeholder="user@email.com"
        value={value}
        className={showError ? S.inputError : S.input}
        aria-invalid={showError ? 'true' : 'false'}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => setIsTouched(true)}
      />
      <ShowErrorOrInfoMessage
        id={messageId}
        error={error}
        showError={showError}
        infoMessage="올바른 이메일 주소 입력"
      />
    </div>
  )
}
