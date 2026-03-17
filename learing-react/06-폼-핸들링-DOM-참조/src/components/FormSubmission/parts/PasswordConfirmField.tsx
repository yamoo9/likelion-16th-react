import { useId, useState } from 'react'
import { createValidator } from '../util'
import { PasswordInput } from './PasswordInput'
import ShowErrorOrInfoMessage from './ShowErrorOrInfoMessage'
import S from '../FormSubmission.module.css'

const validatePasswordConfirm = createValidator(
  '확인용 패스워드를 입력하세요.',
  (value, basePassword) => {
    return value !== basePassword
      ? '패스워드와 동일한 값을 입력해야 합니다.'
      : ''
  },
)

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
  const messageId = useId()
  const [isTouched, setIsTouched] = useState(false)
  const [error, showError] = validatePasswordConfirm(
    value,
    isTouched,
    basePassword,
  )

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
      <ShowErrorOrInfoMessage
        id={messageId}
        error={error}
        showError={showError}
        infoMessage="확인용 패스워드를 입력하세요."
      />
    </div>
  )
}
