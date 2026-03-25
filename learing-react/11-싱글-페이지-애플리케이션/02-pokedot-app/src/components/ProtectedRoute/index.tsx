/* eslint-disable @typescript-eslint/no-unused-vars */

import { useAuth } from '@/contexts/AuthContext'
import LoadingState from '../LoadingState'

type Props = React.PropsWithChildren

/**
 * [인증 보호 라우트: ProtectedRoute]
 * - 인증된 사용자만 접근할 수 있도록 페이지를 보호하는 '가드(Guard)' 역할을 합니다.
 * - 인증되지 않은 사용자가 접근하면 로그인 페이지로 리다이렉트합니다.
 */
export default function ProtectedRoute({ children }: Props) {
  const { isAuthenticated, isLoading } = useAuth()
  
  /* 
    [현재 위치 저장]
    - useLocation: 현재 브라우저의 경로 정보를 가져옵니다.
    - 로그인 후 원래 보려던 페이지로 다시 보내주기 위해(Redirect Back) 사용합니다.
    - 참고: https://reactrouter.com/api/hooks/useLocation
  */
  const location = undefined

  // 인증 상태를 확인 중일 때 (인증 API 통신 대기)
  if (isLoading) {
    return <LoadingState message="인증 확인 중..." />
  }

  /* 
    [선언적 리다이렉트]
    - 인증되지 않은 경우 <Navigate /> 컴포넌트를 반환하여 페이지를 이동시킵니다.
    */
   if (!isAuthenticated) {
     // 로그인 페이지로 이동하도록 Navigate 코드를 작성합니다.
     // - to: 이동할 경로 (/login)
     // - replace: 뒤로가기 시 현재의 '보호된 페이지' 기록을 남기지 않습니다.
     // - state: 현재 경로(location)를 넘겨주어, 로그인 성공 후 다시 이 페이지로 돌아오게 할 수 있습니다.
    return <div role="alert">로그인되지 않은 경우 페이지를 이용할 수 없습니다.</div>
  }

  // 3. 인증된 경우에만 자식 컴포넌트(보호된 콘텐츠)를 렌더링합니다.
  return <>{children}</>
}
