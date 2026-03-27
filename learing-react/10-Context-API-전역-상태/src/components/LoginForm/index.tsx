import { useId, useState } from 'react'
import NameField from './parts/NameField'
import IdField from './parts/IdField'
import EmailField from './parts/EmailField'
import PasswordField from './parts/PasswordField'
import S from './style.module.css'
import { useAuth } from '@/contexts'

// 로그인 테스트 정보를 채우세요.
const TEST_FORM_STATE = {
  name: '지훈',
  id: 'yamoo9',
  email: 'yamoo9@naver.com',
  password: 'Qwerty@1',
}

const INITIAL_FORM_STATE = {
  name: '',
  id: '',
  email: '',
  password: '',
}

type FormState = typeof INITIAL_FORM_STATE
type FormStateKey = keyof FormState

export default function LoginForm() {
  const sectionId = useId()
  const [formState, setFormState] = useState<FormState>(TEST_FORM_STATE)
  const [formResetKey, setFormResetKey] = useState(0)

  const isSomeInputed = Object.values(formState).some(Boolean)
  const isAllInputed = Object.values(formState).every(Boolean)

  const changeFormState = (name: FormStateKey, value: string) => {
    setFormState({ ...formState, [name]: value })
  }

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault()

    // 폼 입력 정보로 로그인을 시도합니다.
    console.log(formState)
  }

  const handleReset = () => {
    setFormState(INITIAL_FORM_STATE)
    setFormResetKey((prev) => prev + 1)
  }

  return (
    <article className={S.card} aria-labelledby={sectionId}>
      <header className={S.header}>
        <h2 id={sectionId} className={S.title}>
          로그인
        </h2>
        <p className={S.description}>
          <a
            href="https://koreandummyjson.vercel.app/docs/auth"
            rel="noopener noreferrer"
            target="_blank"
          >
            인증 API 문서
          </a>{' '}
          참고
        </p>
      </header>

      <form
        key={formResetKey}
        className={S.form}
        onSubmit={handleSubmit}
        onReset={handleReset}
      >
        <NameField
          value={formState.name}
          onChange={(value) => changeFormState('name', value)}
        />
        <IdField
          value={formState.id}
          onChange={(value) => changeFormState('id', value)}
        />
        <EmailField
          value={formState.email}
          onChange={(value) => changeFormState('email', value)}
        />
        <PasswordField
          value={formState.password}
          onChange={(value) => changeFormState('password', value)}
        />
        <div role="group" className={S.buttonGroup}>
          <button
            type="reset"
            className={S.resetButton}
            aria-disabled={!isSomeInputed}
          >
            취소
          </button>
          <button
            type="submit"
            className={S.submitButton}
            aria-disabled={!isAllInputed}
          >
            {/* isPending 상태에 따라 버튼 레이블 변경 */}
            로그인
          </button>
        </div>
      </form>
    </article>
  )
}
