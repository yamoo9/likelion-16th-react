import { useId, useState, type ChangeEvent } from 'react'
import { createValidator } from '@/util'
import ShowErrorOrInfoMessage from './ShowErrorOrInfoMessage'
import S from '../style.module.css'

const MAX_NICKNAME = 10

const validateName = createValidator('이름을 입력하세요.', (value) =>
  /.{2,}/.test(value) ? '' : '2글자 이상 입력해야 합니다.',
)

interface Props {
  value: string
  onChange: (value: string) => void
}

export default function NameField({ value, onChange }: Props) {
  const fieldId = useId()
  const messageId = useId()
  const [isTouched, setIsTouched] = useState(false)
  const [error, showError] = validateName(value, isTouched)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    if (value.length > MAX_NICKNAME) {
      onChange(value.slice(0, MAX_NICKNAME))
      return
    }

    onChange(value)
  }

  return (
    <div className={S.field}>
      <div className={S.labelWrapper}>
        <label htmlFor={fieldId} className={S.label}>
          이름
        </label>
        <span className={S.counter}>
          {value.length}/{MAX_NICKNAME}
        </span>
      </div>
      <input
        id={fieldId}
        value={value}
        className={showError ? S.inputError : S.input}
        aria-invalid={showError ? 'true' : 'false'}
        onChange={handleChange}
        onBlur={() => setIsTouched(true)}
        placeholder="이름을 입력하세요."
        maxLength={MAX_NICKNAME}
      />
      <ShowErrorOrInfoMessage
        id={messageId}
        error={error}
        showError={showError}
        infoMessage="2글자 이상 입력"
      />
    </div>
  )
}
