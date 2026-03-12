import { useId, useState } from 'react'
import { PasswordInput } from './PasswordInput'
import S from '../MultiInputForm.module.css'

const PW_PATTERN = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/

interface Props {
  value: string
  onChange: (val: string) => void
}

export default function PasswordField({ value, onChange }: Props) {
  const fieldId = useId()
  const [isTouched, setIsTouched] = useState(false)

  const getErrorMessage = () => {
    if (!isTouched) return ''
    if (!value) return '비밀번호를 입력해주세요.'

    return PW_PATTERN.test(value)
      ? ''
      : '8자 이상, 대문자, 숫자, 특수문자 조합이 필요합니다.'
  }

  const error = getErrorMessage()
  const showError = error !== ''

  return (
    <div className={S.field}>
      <label htmlFor={fieldId} className={S.label}>
        비밀번호
      </label>
      <PasswordInput
        id={fieldId}
        value={value}
        onChange={onChange}
        onBlur={() => setIsTouched(true)}
        isError={showError}
      />
      {showError && (
        <p className={S.errorMessage} role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
