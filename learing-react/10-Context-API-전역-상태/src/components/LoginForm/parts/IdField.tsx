import { useId, useState } from 'react'
import { createValidator } from '@/utils'
import ShowErrorOrInfoMessage from './ShowErrorOrInfoMessage'
import S from '../style.module.css'

const validateEmail = createValidator('아이디 입력이 필요합니다.', (value) =>
  /.{3,}/.test(value) ? '' : '아이디는 3글자 이상 입력이 필요합니다.',
)

interface Props {
  value: string
  onChange: (val: string) => void
}

export default function IdField({ value, onChange }: Props) {
  const fieldId = useId()
  const messageId = useId()
  const [isTouched, setIsTouched] = useState(false)
  const [error, showError] = validateEmail(value, isTouched)

  return (
    <div className={S.field}>
      <label htmlFor={fieldId} className={S.label}>
        아이디
      </label>
      <input
        id={fieldId}
        type="text"
        placeholder="아이디를 입력하세요."
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
        infoMessage="3글자 이상 입력"
      />
    </div>
  )
}
