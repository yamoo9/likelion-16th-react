import { useState } from 'react'
import S from '../SmartForm.module.css'

interface PasswordInputProps {
  id: string
  describeId: string
  value: string
  onChange: (val: string) => void
  onBlur: () => void
  placeholder?: string
  isError?: boolean
}

export function PasswordInput({
  id,
  describeId,
  value,
  onChange,
  onBlur,
  placeholder,
  isError,
}: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false)
  const toggleVisibility = () => setIsVisible((prev) => !prev)

  return (
    <div className={S.inputContainer}>
      <input
        id={id}
        type={isVisible ? 'text' : 'password'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={isError ? S.inputError : S.input}
        placeholder={placeholder || '••••••••'}
        aria-invalid={isError ? 'true' : 'false'}
        aria-describedby={describeId}
      />
      <button
        type="button"
        className={S.visibilityButton}
        onClick={toggleVisibility}
        aria-label={isVisible ? '비밀번호 숨기기' : '비밀번호 표시'}
        aria-pressed={isVisible}
      >
        {isVisible ? <EyeOffIcon /> : <EyeOnIcon />}
      </button>
    </div>
  )
}

const EyeOffIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
    <line x1="2" y1="2" x2="22" y2="22" />
  </svg>
)

const EyeOnIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)
