import { useId } from 'react'
import NicknameField from './parts/NicknameField'
import EmailField from './parts/EmailField'
import PasswordField from './parts/PasswordField'
import PasswordConfirmField from './parts/PasswordConfirmField'
import S from './MultiInputForm.module.css'

// -------------------------------------------------------------------
// 실습 가이드
// -------------------------------------------------------------------
// 1. 모든 필드의 초기값을 가진 객체 'INITIAL_STATE'를 컴포넌트 외부에 정의하세요.
// 2. INITIAL_STATE를 사용하는 하나의 'formState' 상태(객체형)를 선언합니다.
// 3. name과 value를 인자로 받아 formState를 업데이트하는 함수를 작성하세요.
// 4. 폼 초기화(reset) 이벤트 핸들러를 작성하세요.
// -------------------------------------------------------------------

export default function MultiInputForm() {
  const sectionId = useId()

  const nickname = ''
  const email = ''
  const password = ''
  const passwordConfirm = ''

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

      <form className={S.form}>
        <NicknameField
          value={nickname}
          onChange={() => {}}
        />
        <EmailField
          value={email}
          onChange={() => {}}
        />
        <PasswordField
          value={password}
          onChange={() => {}}
        />
        <PasswordConfirmField
          value={passwordConfirm}
          basePassword={password}
          onChange={() => {}}
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