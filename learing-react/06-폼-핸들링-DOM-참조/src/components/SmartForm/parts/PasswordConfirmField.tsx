/* eslint-disable @typescript-eslint/no-unused-vars */
import { useId } from 'react'
import S from '../SmartForm.module.css'
import { PasswordInput } from './PasswordInput'

interface Props {
  value: string
  basePassword: string
  onChange: (val: string) => void
}

export default function PasswordConfirmField({
  value,
  basePassword,
  onChange,
}: Props) {
  const fieldId = useId()

  // TODO 1: '필드 방문 여부'를 관리할 상태를 만드세요.

  // TODO 2: 현재 값(value)과 원본(basePassword)을 비교해 에러 메시지를 반환하는 함수를 완성하세요.
  const getErrorMessage = () => {
    // 힌트 1: 방문하지 않았다면 빈 문자열을 반환하세요.
    // 힌트 2: 값이 없다면 '비밀번호를 한 번 더 입력해주세요.'를 반환하세요.
    // 힌트 3: 두 값이 다르면 '비밀번호가 일치하지 않습니다.'를 반환하세요.
  }

  // TODO 3: 위 함수를 호출하여 현재 에러 여부(showError)를 판단하는 변수를 만드세요.

  return (
    <div className={S.field}>
      <label htmlFor={fieldId} className={S.label}>
        패스워드 확인
      </label>

      {/* TODO 4: PasswordInput 컴포넌트에 필요한 Props를 연결하세요. (onBlur 시 방문 상태 업데이트) */}
      <PasswordInput
        id={fieldId}
        value={value}
        onChange={onChange}
        onBlur={() => {}}
        isError={false}
      />

      {/* TODO 5: showError가 true일 때만 에러 메시지를 렌더링하세요. */}
      {/* <p className={S.errorMessage} role="alert">
        {'에러 메시지'}
      </p> */}
    </div>
  )
}
