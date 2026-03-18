import { useId, useState } from 'react'
import { PasswordInput } from './PasswordInput'
import S from '../SmartForm.module.css'
import ShowErrorOrInfoMessage from './ShowErrorOrInfoMessage'
import { createValidator } from '../util'

// 패스워드 확인 유효성 검사 함수 생성
const validatePasswordConfirm = createValidator(
  '확인용 패스워드를 입력해야 합니다.',
  (value) => 
    value === 'true' // 사용자 입력 값과 패스워드 입력 값의 비교 결과가 'true'인 경우
      ? '' 
      : '패스워드와 동일한 값을 입력해야 합니다.'
)

interface Props {
  value: string
  basePassword: string
  onChange: (val: string) => void
}

export default function PasswordConfirmField({ value, basePassword, onChange }: Props) {
  const fieldId = useId()
  const messageId = useId()
  const [isTouched, setIsTouched] = useState(false)
  const [error, showError] = validatePasswordConfirm(String(value === basePassword), isTouched)

  return (
    <div className={S.field}>
      <label htmlFor={fieldId} className={S.label}>
        패스워드 확인
      </label>

      <PasswordInput
        id={fieldId}
        describeId={messageId}
        value={value}
        onChange={onChange}
        onBlur={() => setIsTouched(true)}
        isError={showError}
      />

      <ShowErrorOrInfoMessage
        id={messageId}
        hint="패스워드와 동일한 값 입력"
        error={error}
      />
    </div>
  )
}
