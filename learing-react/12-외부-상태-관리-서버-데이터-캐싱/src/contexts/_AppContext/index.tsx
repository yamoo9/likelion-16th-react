import { BrowserRouter } from 'react-router-dom'
import ComposeProvider from '@/contexts/_ComposeProvider'
import { AuthProvider } from '@/contexts/_AuthContext'
import { ThemeProvider } from '@/contexts/_ThemeContext'
import { ModalProvider } from '@/contexts/_ModalContext'
import { CollectionProvider } from '../_CollectionContext'

/**
 * [전역 상태 관리의 통합 입구: AppProvider]
 * - 서비스 운영에 필요한 모든 Context Provider들을 한곳에서 관리합니다.
 * - ComposeProvider를 사용하여 가독성을 높이고 중첩 구조를 단순화했습니다.
 */
export default function AppProvider({ children }: React.PropsWithChildren) {
  return (
    <ComposeProvider
      /* 
        [중요: Provider 배치 순서 가이드]
        - 배열의 위쪽에 있을수록 '바깥쪽(부모)'에 위치하게 됩니다.
        - 아래쪽(자식)에 있는 Provider는 위쪽(부모)의 상태에 접근할 수 있습니다.
      */
      providers={[
        // 인증 상태 (모든 곳에서 유저 정보가 필요함)
        <AuthProvider />, 
        
        // 테마 상태 (인증 여부와 상관없이 동작 가능)
        <ThemeProvider />, 
        
        // 라우터 상태 (URL 주소에 따라 화면을 전환)
        <BrowserRouter />, 
        
        /* 
          모달 상태 
          - 인증 정보(useAuth) 확인 가능
          - 테마(useTheme) 적용 가능
          - 페이지 이동(useNavigate) 가능
        */
        <ModalProvider />, 

        /* 
          콜렉션 상태
          - 포켓몬 수집
        */
        <CollectionProvider />,
      ]}
    >
      {children}
    </ComposeProvider>
  )
}