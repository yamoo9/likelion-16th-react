import { useId, useState } from 'react'
import { PasswordInput } from './PasswordInput'
import S from '../SmartForm.module.css'

// 8자 이상, 대문자, 숫자, 특수문자(!@#$%^&*) 포함 정규식
const PW_PATTERN = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/

interface Props {
  value: string
  onChange: (val: string) => void
}

export default function PasswordField({ value, onChange }: Props) {
  const fieldId = useId()
  const messageId = useId()

  const [isTouched, setIsTouched] = useState(false)

  const getErrorMessage = () => {
    if (!isTouched) return ''
    if (!value) return '패스워드를 입력해주세요.'

    return PW_PATTERN.test(value)
      ? ''
      : '8자 이상, 대문자, 숫자, 특수문자 조합이 필요합니다.'
  }

  const error = getErrorMessage()
  const showError = error !== ''

  return (
    <div className={S.field}>
      <label htmlFor={fieldId} className={S.label}>
        패스워드
      </label>

      <PasswordInput
        id={fieldId}
        describeId={messageId}
        value={value}
        onChange={onChange}
        onBlur={() => {
          setIsTouched(true)
        }}
        isError={showError}
      />

      {showError ? (
        <p id={messageId} className={S.errorMessage} role="alert">
          {error}
        </p>
      ) : (
        <p id={messageId} className={S.infoMessage}>
          대문자, 숫자, 특수문자(!@#$%^&*) 포함 8자 이상 입력
        </p>
      )}
    </div>
  )
}
