import { useId, useState } from 'react'
import NicknameField from './parts/NicknameField'
import EmailField from './parts/EmailField'
import PasswordField from './parts/PasswordField'
import PasswordConfirmField from './parts/PasswordConfirmField'
import S from './SmartForm.module.css'

export default function SmartForm() {
  const sectionId = useId()
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

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
      >
        <NicknameField value={nickname} onChange={setNickname} />
        <EmailField value={email} onChange={setEmail} />
        <PasswordField value={password} onChange={setPassword} />
        <PasswordConfirmField
          value={passwordConfirm}
          basePassword={password}
          onChange={setPasswordConfirm}
        />

        <button type="submit" className={S.submitButton}>
          가입
        </button>
      </form>
    </article>
  )
}
