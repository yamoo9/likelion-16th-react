import { useId, useState } from 'react'
import { PasswordInput } from './PasswordInput'
import S from '../SmartForm.module.css'

interface Props {
  value: string
  basePassword: string
  onChange: (val: string) => void
}

// -------------------------------------------------------------------
// 실습 가이드
// -------------------------------------------------------------------
// 1. 입력 필드의 '도움말 메시지 ID'를 생성합니다.
// 2. 사용자의 '입력 여부'를 관리할 상태를 선언합니다.
// 3. '패스워드'와 '패스워드 확인' 값을 비교해 에러 메시지를 반환하는 함수를 작성합니다.
//    - 아직 입력 전이라면 빈 문자열('')을 반환합니다.
//    - 입력 이후, 값이 없다면 '비밀번호를 한 번 더 입력해주세요.'를 반환합니다.
//    - 입력 이후, 두 값이 다르면 '비밀번호가 일치하지 않습니다.'를 반환합니다.
//    - 입력 이후, 두 값이 같다면 빈 문자열('')을 반환합니다.
// 4. 에러 메시지 반환 함수를 실행해 '에러(error, 파생된 상태)' 변수를 작성합니다.
// 5. 에러 변수를 토대로 '에러 표시 여부(showError, 파생된 상태)' 변수를 작성합니다.
// -------------------------------------------------------------------

export default function PasswordConfirmField({
  value,
  basePassword,
  onChange,
}: Props) {
  const fieldId = useId()
  const messageId = useId()

  const [isTouched, setIsTouched] = useState(false)

  const getErrorMessage = () => {
    if (!isTouched) return ''
    if (!value) return '확인용 패스워드를 입력해야 합니다.'
    return value !== basePassword ? '패스워드와 동일한 값을 입력해야 합니다.' : ''
  }

  const error = getErrorMessage()
  const showError = error !== ''

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

      {showError ? (
        <p role="alert" className={S.errorMessage}>
          {error}
        </p>
      ) : (
        <p id={messageId} className={S.infoMessage}>
          패스워드와 동일한 값 입력
        </p>
      )}
    </div>
  )
}
