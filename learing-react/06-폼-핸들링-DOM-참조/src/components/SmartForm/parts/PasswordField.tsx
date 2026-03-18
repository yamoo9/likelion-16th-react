import { useId, useState } from 'react'
import { PasswordInput } from './PasswordInput'
import S from '../SmartForm.module.css'
import ShowErrorOrInfoMessage from './ShowErrorOrInfoMessage'
import { createValidator } from '../util'

// 8자 이상, 대문자, 숫자, 특수문자(!@#$%^&*) 포함 정규식
const PW_PATTERN = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/

// 패스워드 유효성 검사 함수 생성
const validatePassword = createValidator(
  '패스워드 입력이 필요합니다.',
  (value) => 
    PW_PATTERN.test(value) 
      ? '' 
      : '8자 이상, 대문자, 숫자, 특수문자 조합이 필요합니다.'
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

      <ShowErrorOrInfoMessage
        id={messageId}
        hint="대문자, 숫자, 특수문자(!@#$%^&*) 포함 8자 이상 입력"
        error={error}
      />
    </div>
  )
}
