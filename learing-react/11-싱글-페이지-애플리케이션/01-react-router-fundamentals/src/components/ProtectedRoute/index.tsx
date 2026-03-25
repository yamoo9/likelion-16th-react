import { useAuth } from '../../contexts/AuthContext'

export default function ProtectedRoute({ children }: React.PropsWithChildren) {
  const user = null

  return <p role="status">인증 상태 확인 중...</p>
  return <>{children}</>
}
