import LoginForm from '@/components/LoginForm'
import S from './style.module.css'
import { useAuth } from '@/contexts'

export default function AuthTest() {

  const { user } = useAuth()

  return (
    <div className={S.container}>
      <h1> {user?.email ?? ''} 인증 테스트</h1>
      <LoginForm />
    </div>
  )
}
