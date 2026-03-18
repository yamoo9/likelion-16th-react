import { useId, useState } from 'react'
import { createValidator } from '../util'
import ShowErrorOrInfoMessage from './ShowErrorOrInfoMessage'
import S from '../SmartForm.module.css'

const MAX_NICKNAME = 10
const PROFANITY_PATTERN = '바보 멍청이 또라이'.split(' ').join('|')
const PROFANITY_REG = new RegExp(PROFANITY_PATTERN)
const PROFANITY_SUBSTITUTION = '???'

interface Props {
  value: string
  onChange: React.Dispatch<React.SetStateAction<string>>
}

const validateNickName = createValidator(
  '닉네임을 입력하세요.',
  (value: string) => {
    return PROFANITY_REG.test(value)
      ? '비속어는 닉네임으로 사용할 수 없습니다.'
      : ''
  },
)

export default function NicknameField({ value, onChange }: Props) {
  const fieldId = useId()
  const messageId = useId()
  const [isTouched, setIsTouched] = useState(false)
  const [error, showError] = validateNickName(value, isTouched)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    if (value.length > MAX_NICKNAME) {
      const truncatedValue = value.slice(0, MAX_NICKNAME)
      onChange(truncatedValue)
      return
    }

    onChange(value)
  }

  const changeProfanity = (value: string) => {
    onChange(value.replace(PROFANITY_REG, PROFANITY_SUBSTITUTION))
  }

  return (
    <div className={S.field}>
      <div className={S.labelWrapper}>
        <label htmlFor={fieldId} className={S.label}>
          닉네임
        </label>
        <span className={S.counter}>
          {value.length}/{MAX_NICKNAME}
        </span>
      </div>
      <input
        id={fieldId}
        placeholder="닉네임을 입력하세요"
        value={value}
        className={showError ? S.inputError : S.input}
        aria-invalid={showError ? 'true' : 'false'}
        aria-describedby={messageId}
        onChange={handleChange}
        onCompositionEnd={(e) => changeProfanity(e.currentTarget.value)}
        onBlur={(e) => {
          if (!isTouched) setIsTouched(true)
          changeProfanity(e.target.value)
        }}
      />
      <ShowErrorOrInfoMessage
        id={messageId}
        hint="비속어(예: 바보, 멍청이, 또라이 등) 사용 금지"
        error={error}
      />
    </div>
  )
}
