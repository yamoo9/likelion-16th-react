import ProtectedContent from '../ProtectedContent'
import LoginForm from '../LoginForm'
import S from './style.module.css'

export default function Main() {
  const user = null

  return (
    <main className={S.main}>
      {/* user 상태에 따라 로그인 또는 보호된 콘텐츠 화면이 보이도록 조건부 UI 렌더링합니다. */}
      <LoginForm />
      <ProtectedContent user={user} />
    </main>
  )
}
