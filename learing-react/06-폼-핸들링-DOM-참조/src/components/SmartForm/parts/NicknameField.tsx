import { useId } from 'react'
import S from '../SmartForm.module.css'

const MAX_NICKNAME = 10
const PROFANITY_PATTERN = '바보 멍청이 또라이'.split(' ').join('|')
const PROFANITY_SUBSTITUTION = '???'

interface Props {
  value: string
  onChange: React.Dispatch<React.SetStateAction<string>>
}

export default function NicknameField({ value, onChange }: Props) {
  const fieldId = useId()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    // TODO 1: [글자 수 제한]
    // 입력값이 MAX_NICKNAME을 넘으면 잘라내고 리턴하세요.
    if (value.length > MAX_NICKNAME) {
      const truncatedValue = value.slice(0, MAX_NICKNAME)
      onChange(truncatedValue)
      return // 함수 종료
    }

    onChange(value)
  }
  
  const changeProfanity = (value: string) => {
    // TODO 2: [영문/숫자/조합 완료 시 필터링]
    // String.prototype.replace와 정규식(Regular Expression, RegExp)을 사용해
    // 한글 조합이 완전히 끝나는 시점에 다시 한번 비속어를 걸러주세요.
    const filteredValue = value.replace(
      new RegExp(PROFANITY_PATTERN, 'g'), // /바보|멍청이|또라이/g
      PROFANITY_SUBSTITUTION, // '???'
    )
  
    onChange(filteredValue) // 닉네임 상태 업데이트 요청 (다음번 렌더링에서 반영)
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
        placeholder="닉네임을 입력하세요"
        value={value}
        onChange={handleChange}
        onCompositionEnd={(e) => changeProfanity(e.currentTarget.value)}
        onBlur={(e) => changeProfanity(e.target.value)}
      />
    </div>
  )
}
