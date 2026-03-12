import { useId, useState } from 'react'
import NicknameField from './parts/NicknameField'
import EmailField from './parts/EmailField'
import PasswordField from './parts/PasswordField'
import PasswordConfirmField from './parts/PasswordConfirmField'
import S from './FormSubmission.module.css'

const INITIAL_STATE = {
  nickname: '',
  email: '',
  password: '',
  passwordConfirm: '',
}

type FormStateKey = keyof typeof INITIAL_STATE

export default function FormSubmission() {
  const sectionId = useId()
  const [formState, setFormState] = useState(INITIAL_STATE)
  const [formResetKey, setFormResetKey] = useState(0)

  const handleChange = (name: FormStateKey, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // TODO 1. 제출 중(isSubmitting) 상태와 성공(isSuccess) 상태를 추가해보세요.
  // 힌트: useState를 활용해 불리언(boolean) 값을 관리합니다.

  // TODO 2. 파생된 상태(Derived State)를 만들어보세요.
  // 힌트: 별도의 state를 만들지 않고 formState의 값들을 확인하여 결정합니다.
  // - isAllInputed: 모든 필드에 값이 입력되었는가? (Object.values 활용)
  // - isSomeInputed: 필드 중 하나라도 값이 입력되었는가?

  // TODO 3. 제출 핸들러(handleSubmit)를 완성하세요.
  const handleSubmit = async () => {
    // [3-1] 브라우저 기본 새로고침 방지

    // [3-2] 방어 로직: 이미 제출 중이거나 모든 필드가 채워지지 않았다면 실행 중단

    try {
      // [3-3] 제출 시작: 로딩 상태(isSubmitting)를 true로 변경
      // [3-4] 비동기 통신 시뮬레이션: 1.5초 대기 (setTimeout + Promise 활용)
      // await new Promise((resolve) => setTimeout(resolve, 1500))
      // [3-5] 제출 성공: 성공 상태(isSuccess)를 true로 변경하고 폼 초기화(handleReset) 호출
    } catch {
      alert('전송에 실패했습니다.')
    } finally {
      // [3-6] 제출 종료: 성공/실패 여부와 상관없이 로딩 상태를 false로 변경
    }
  }

  const handleReset = () => {
    // [추가 실습] 제출 중이거나 입력된 내용이 없을 때는 리셋되지 않도록 방어해보세요.

    setFormState(INITIAL_STATE)
    setFormResetKey((prev) => prev + 1)
  }

  // TODO 4. 성공 화면을 조건부 렌더링으로 처리하세요.
  // 힌트: isSuccess가 true라면 <SuccessMessage />를 반환(return)합니다.

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
        key={formResetKey}
        className={S.form}
        onSubmit={handleSubmit}
        onReset={handleReset}
        noValidate
      >
        <NicknameField
          value={formState.nickname}
          onChange={(value) => handleChange('nickname', value)}
        />

        <EmailField
          value={formState.email}
          onChange={(value) => handleChange('email', value)}
        />

        <PasswordField
          value={formState.password}
          onChange={(value) => handleChange('password', value)}
        />

        <PasswordConfirmField
          value={formState.passwordConfirm}
          basePassword={formState.password}
          onChange={(value) => handleChange('passwordConfirm', value)}
        />

        <div role="group" className={S.buttonGroup}>
          <button
            type="reset"
            className={S.resetButton}
            // TODO 5. 취소 버튼의 비활성화 상태(aria-disabled)를 설정해보세요.
          >
            취소
          </button>
          <button
            type="submit"
            className={S.submitButton}
            // TODO 6. 가입 버튼의 비활성화 상태(aria-disabled)를 설정하고,
            // 제출 중일 때 텍스트를 '처리 중...'으로 변경해보세요.
          >
            가입
          </button>
        </div>
      </form>
    </article>
  )
}
