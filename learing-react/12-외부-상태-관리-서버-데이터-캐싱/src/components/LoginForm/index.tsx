import { useState } from 'react'
import S from './style.module.css'
import { useInput } from '@/hooks'

interface Props {
  onLogin: (username: string, password: string) => Promise<void>
  defaultUserId?: string
  defaultPassword?: string
}

export default function LoginForm({
  onLogin,
  defaultUserId = '',
  defaultPassword = '',
}: Props) {
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const userIdInput = useInput<HTMLInputElement>(defaultUserId)
  const passwordInput = useInput<HTMLInputElement>(defaultPassword)

  const { value: userIdValue } = userIdInput.props
  const { value: passwordValue } = passwordInput.props

  const isAllInputed = userIdValue.trim() && passwordValue.trim()


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!userIdValue || !passwordValue) {
      setError('아이디와 패스워드를 모두 입력해주세요.')
      return
    }

    try {
      setIsLoading(true)
      await onLogin(userIdValue, passwordValue)
    } catch {
      setError('로그인에 실패했습니다. 아이디와 패스워드를 확인해주세요.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className={S.formSection} aria-labelledby="login-title">
      <h2 id="login-title" className={S.title}>
        로그인
      </h2>

      <form onSubmit={handleSubmit} className={S.form} aria-label="로그인 폼" noValidate>
        <div className={S.inputGroup}>
          <label htmlFor="userId">아이디</label>
          <input
            id="userId"
            type="text"
            required
            placeholder="아이디를 입력하세요"
            autoComplete="username"
            aria-required="true"
            aria-disabled={isLoading}
            {...userIdInput.props}
          />
        </div>

        <div className={S.inputGroup}>
          <label htmlFor="password">패스워드</label>
          <input
            id="password"
            type="password"
            required
            placeholder="패스워드를 입력하세요"
            autoComplete="current-password"
            aria-required="true"
            aria-disabled={isLoading}
            {...passwordInput.props}
          />
        </div>

        <button
          type="submit"
          className={S.loginButton}
          aria-disabled={isLoading || !isAllInputed}
        >
          {isLoading ? '로그인 중...' : '로그인'}
        </button>

        {error && (
          <div role="alert" className={S.error}>
            {error}
          </div>
        )}
      </form>
    </section>
  )
}
