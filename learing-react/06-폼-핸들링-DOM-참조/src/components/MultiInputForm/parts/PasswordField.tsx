import { useId, useState } from 'react'
import { createValidator } from '../util'
import { PW_PATTERN } from '../patterns'
import { PasswordInput } from './PasswordInput'
import ShowErrorOrInfoMessage from './ShowErrorOrInfoMessage'
import S from '../MultiInputForm.module.css'

const validatePassword = createValidator('패스워드를 입력해주세요.', (value) =>
  new RegExp(PW_PATTERN).test(value)
    ? ''
    : '8자 이상, 대문자, 숫자, 특수문자 조합이 필요합니다.',
)

interface Props {
  value: string
  onChange: (val: string) => void
}

export default function PasswordField({ value, onChange }: Props) {
  const fieldId = useId()
  const messageId = useId()
  const [isTouched, setIsTouched] = useState(false)
  const [error, showError] = validatePassword(value, isTouched)

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
      <ShowErrorOrInfoMessage
        id={messageId}
        error={error}
        showError={showError}
        infoMessage="대문자, 숫자, 특수문자(!@#$%^&*) 포함 8자 이상 입력"
      />
    </div>
  )
}
