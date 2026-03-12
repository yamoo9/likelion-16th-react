import { useId, useState } from 'react'
import { PasswordInput } from './PasswordInput'
import S from '../MultiInputForm.module.css'

interface Props {
  value: string
  basePassword: string
  onChange: (val: string) => void
}

export default function PasswordConfirmField({
  value,
  basePassword,
  onChange,
}: Props) {
  const fieldId = useId()
  const [isTouched, setIsTouched] = useState(false)

  const getErrorMessage = () => {
    if (!isTouched) return ''
    if (!value) return '비밀번호를 한 번 더 입력해주세요.'

    return value === basePassword ? '' : '비밀번호가 일치하지 않습니다.'
  }

  const error = getErrorMessage()
  const showError = error !== ''

  return (
    <div className={S.field}>
      <label htmlFor={fieldId} className={S.label}>
        패스워드 확인
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
