import { useId, useState } from 'react'
import S from '../SmartForm.module.css'

// 이메일 검사를 위한 정규식
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface Props {
  value: string
  onChange: (val: string) => void
}

export default function EmailField({ value, onChange }: Props) {
  const filedId = useId()

  // 에러 상태 (string)
  const [error, setError] = useState('') // 에러 없음: '' / 에러 있음: '유효한 이메일이 아닙니다.'

  // 터치 상태 (boolean)
  const [isTouched, setIsTouched] = useState(false) // 터치 안했음: false / 터치 했음: true

  // 파생된 상태 (선언된 상태들에 의존하는 계산된 변수)
  const showError = isTouched && !!error

  // blur 이벤트 핸들러
  const handleCheck = (e: React.FocusEvent<HTMLInputElement>) => {
    /* 터치 상태 전환, 이메일 유효성 검사 */
    setIsTouched(true) // 사용자 터치한 상태 업데이트
    const isValidEmail = EMAIL_PATTERN.test(e.target.value)
    setError(isValidEmail ? '' : '유효한 이메일 아닙니다.') // 이메일의 유효 여부에 따라 에러 상태 업데이트
  }

  return (
    <div className={S.field}>
      <label htmlFor={filedId} className={S.label}>
        이메일
      </label>
      <input
        id={filedId}
        type="email"
        placeholder="user@email.com"
        className={showError ? S.inputError : S.input}
        aria-invalid={showError ? 'true' : 'false'}
        onChange={(e) => onChange(e.target.value)}
        onBlur={handleCheck}
        value={value}
      />

      {showError && (
        <p role="alert" className={S.errorMessage}>
          {error}
        </p>
      )}
    </div>
  )
}
