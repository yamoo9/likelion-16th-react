/* eslint-disable @typescript-eslint/no-unused-vars */
import { useId, useState } from 'react'
import NicknameField from './parts/NicknameField'
import EmailField from './parts/EmailField'
import PasswordField from './parts/PasswordField'
import PasswordConfirmField from './parts/PasswordConfirmField'
import S from './MultiInputForm.module.css'

// TODO 1: 모든 필드의 초기값을 가진 객체 'INITIAL_STATE'를 컴포넌트 외부에 정의하세요.

export default function MultiInputForm() {
  const sectionId = useId()

  // TODO 2: 아래 4개의 개별 State를 제거하고,
  // INITIAL_STATE를 사용하는 하나의 'formState'로 통합하세요.
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  // TODO 3: [name]과 value를 인자로 받아
  // formState를 업데이트하는 핸들러를 작성하세요.
  const handleChange = () => {
    // 로직 작성
  }

  // TODO 5: 폼 초기화 핸들러를 작성하세요.
  const handleReset = () => {
    // 로직 작성
  }

  return (
    <article className={S.card} aria-labelledby={sectionId}>
      <header className={S.header}>
        <h2 id={sectionId} className={S.title}>
          회원 가입
        </h2>
        <p className={S.description}>
          가입 정보를 입력하고 각 입력 필드의 검증 전략을 확인하세요.
        </p>
      </header>

      <form
        className={S.form}
        onSubmit={(e) => e.preventDefault()}
        onReset={handleReset}
        noValidate
      >
        {/* TODO 4: 각 필드의 value를 formState에서 가져오고, 
            onChange에 handleChange를 연결하세요. */}
        <NicknameField
          value={nickname}
          onChange={(value) => {} /* 여기에 handleChange 연결 */}
        />

        <EmailField
          value={email}
          onChange={(value) => {} /* 여기에 handleChange 연결 */}
        />

        <PasswordField
          value={password}
          onChange={(value) => {} /* 여기에 handleChange 연결 */}
        />

        <PasswordConfirmField
          value={passwordConfirm}
          basePassword={password}
          onChange={(value) => {} /* 여기에 handleChange 연결 */}
        />

        <div role="group" className={S.buttonGroup}>
          <button type="reset" className={S.resetButton}>
            취소
          </button>
          <button type="submit" className={S.submitButton}>
            가입
          </button>
        </div>
      </form>
    </article>
  )
}