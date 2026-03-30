import { useAuth } from '@/contexts'
import S from './style.module.css'
import { useTransition } from 'react'

export default function Login() {
  const { login } = useAuth()
  const [isLoading, startTransition] = useTransition()

  const handleLogin = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    // 방어적 프로그래밍
    if (isLoading) return

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string

    // 로그인 시도(요청/응답)
    startTransition(async () => {
      await login(email)
    })
  }

  return (
    <div className={S.page}>
      <div className={S.box}>
        <h1>로그인</h1>
        <form className={S.form} onSubmit={handleLogin}>
          <input
            type="text"
            name="email"
            aria-label="이메일"
            defaultValue="yamoo9@naver.com"
          />
          <button
            type="submit"
            className={S.submitButton}
            aria-disabled={isLoading}
          >
            {isLoading ? '로그인 중...' : '로그인'}
          </button>
        </form>
      </div>
    </div>
  )
}
