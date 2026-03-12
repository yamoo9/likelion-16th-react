/* eslint-disable @typescript-eslint/no-unused-vars */
import { useId } from 'react'
import { PasswordInput } from './PasswordInput'
import S from '../SmartForm.module.css'

// 8자 이상, 대문자, 숫자, 특수문자(!@#$%^&*) 포함 정규식
const PW_PATTERN = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/

interface Props {
  value: string
  onChange: (val: string) => void
}

export default function PasswordField({ value, onChange }: Props) {
  const fieldId = useId()

  // TODO 1: '필드 방문 여부'를 관리할 상태를 만드세요.

  // TODO 2: 별도의 에러 상태 없이, 현재 value와 isTouched를 조합해 에러 메시지를 반환하는 함수를 완성하세요.
  const getErrorMessage = () => {
    // 힌트: PW_PATTERN.test(value)를 활용해 '8자 이상, 대문자, 숫자, 특수문자 조합이 필요합니다.'를 반환하세요.
    
  }

  // TODO 3: 위 함수를 호출하여 현재 에러 여부(showError)를 판단하는 변수를 만드세요.
  

  return (
    <div className={S.field}>
      <label htmlFor={fieldId} className={S.label}>
        패스워드 
      </label>

      {/* TODO 4: PasswordInput 컴포넌트에 필요한 Props(id, value, onBlur, isError 등)를 연결하세요. */}
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
