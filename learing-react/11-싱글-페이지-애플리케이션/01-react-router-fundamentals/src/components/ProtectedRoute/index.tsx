import { Navigate } from 'react-router-dom'
import { NAVIGATION_PATH } from '@/configs/navigationPaths'
import { useAuth } from '@/contexts'

export default function ProtectedRoute({ children }: React.PropsWithChildren) {
  
  const { user, initializing } = useAuth()

  console.log('ProtectedRoute 렌더')

  // 1. 기다려봐. 먼저 인증 상태 확인해볼께. (앱 초기화 중...)
  if (initializing) {
    console.log('앱 초기화 중...')
    return <p role="status">인증 상태 확인 중...</p>
  }

  // 2. 인증된 사용자가 아니야? 그럼 로그인 페이지로 가서 로그인해!
  if (!user) {
    console.log('ProtectedRoute에 의해 로그인 페이지로 이동')
    return <Navigate to={NAVIGATION_PATH.login} replace />
  }

  console.log('ProtectedRoute에서 통과. 마이 페이지 표시')
  // 3. 인증된 사용자 맞네? 그럼 통과 (마이 페이지 내용 표시)
  return <>{children}</>
}
