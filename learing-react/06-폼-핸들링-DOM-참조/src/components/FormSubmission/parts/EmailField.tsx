import { useId, useState } from 'react'
import S from '../FormSubmission.module.css'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface Props {
  value: string
  onChange: (val: string) => void
}

export default function EmailField({ value, onChange }: Props) {
  const fieldId = useId()
  const [error, setError] = useState('')
  const [isTouched, setIsTouched] = useState(false)

  const handleBlur = () => {
    setIsTouched(true)
    setError(EMAIL_PATTERN.test(value) ? '' : '올바른 이메일 형식이 아닙니다.')
  }

  const showError = isTouched && error

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
        onChange={(e) => onChange(e.target.value)}
        onBlur={handleBlur}
        className={showError ? S.inputError : S.input}
        aria-invalid={showError ? 'true' : 'false'}
      />
      {showError && (
        <p role="alert" className={S.errorMessage}>
          {error}
        </p>
      )}
    </div>
  )
}
