import { useId, useState, type ChangeEvent } from 'react'
import { PROFANITY_PATTERN, PROFANITY_SUBSTITUTION } from '../patterns'
import { createValidator } from '../util'
import ShowErrorOrInfoMessage from './ShowErrorOrInfoMessage'
import S from '../FormSubmission.module.css'

const MAX_NICKNAME = 10
const profanityReg = new RegExp(PROFANITY_PATTERN, 'g')

const validateNickname = createValidator('닉네임을 입력하세요.', (value) =>
  profanityReg.test(value) ? '비속어는 닉네임으로 사용할 수 없습니다.' : '',
)

interface Props {
  value: string
  onChange: (val: string) => void
}

export default function NicknameField({ value, onChange }: Props) {
  const fieldId = useId()
  const messageId = useId()
  const [isTouched, setIsTouched] = useState(false)
  const [error, showError] = validateNickname(value, isTouched)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    if (value.length > MAX_NICKNAME) {
      onChange(value.slice(0, MAX_NICKNAME))
      return
    }

    onChange(value)
  }

  const checkProfanity = (value: string) => {
    const filteredValue = value.replace(profanityReg, PROFANITY_SUBSTITUTION)

    onChange(filteredValue)
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
        value={value}
        className={showError ? S.inputError : S.input}
        aria-invalid={showError ? 'true' : 'false'}
        onChange={handleChange}
        onCompositionEnd={(e) => checkProfanity(e.currentTarget.value)}
        onBlur={(e) => { setIsTouched(true); checkProfanity(e.target.value) }}
        placeholder="닉네임을 입력하세요 (비속어 금지)"
        maxLength={MAX_NICKNAME}
      />
      <ShowErrorOrInfoMessage
        id={messageId}
        error={error}
        showError={showError}
        infoMessage="비속어(예: 바보, 멍청이, 또라이 등) 사용 금지"
      />
    </div>
  )
}
