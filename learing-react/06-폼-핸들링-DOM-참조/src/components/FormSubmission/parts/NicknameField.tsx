import { useId, type ChangeEvent, type CompositionEvent } from 'react'
import S from '../FormSubmission.module.css'

const MAX_NICKNAME = 10
const PROFANITY_PATTERN = '바보 멍청이 또라이'.split(' ').join('|')
const PROFANITY_SUBSTITUTION = '???'

interface Props {
  value: string
  onChange: (val: string) => void
}

export default function NicknameField({ value, onChange }: Props) {
  const fieldId = useId()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { nativeEvent, target: { value: inputValue } } = e

    const { isComposing } = nativeEvent as InputEvent

    if (inputValue.length > MAX_NICKNAME) {
      onChange(inputValue.slice(0, MAX_NICKNAME))
      return
    }

    if (isComposing) {
      onChange(inputValue)
      return
    }

    compositionIME(inputValue)
  }

  const handleCompositionEnd = (e: CompositionEvent<HTMLInputElement>) => {
    compositionIME(e.currentTarget.value)
  }

  const compositionIME = (value: string) => {
    const filtered = value.replace(
      new RegExp(PROFANITY_PATTERN, 'g'),
      PROFANITY_SUBSTITUTION,
    )

    onChange(filtered)
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
        className={S.input}
        value={value}
        onChange={handleChange}
        onCompositionEnd={handleCompositionEnd}
        placeholder="닉네임을 입력하세요 (비속어 금지)"
        maxLength={MAX_NICKNAME}
      />
    </div>
  )
}
