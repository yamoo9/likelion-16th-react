import ComposeProvider from '@/contexts/ComposeProvider'
import { AuthProvider } from '@/contexts/AuthContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { ModalProvider } from '@/contexts/ModalContext'
import { CollectionProvider } from '../CollectionContext'

/**
 * [전역 상태 관리의 통합 입구: AppProvider]
 * - 서비스 운영에 필요한 모든 Context Provider들을 한곳에서 관리합니다.
 * - ComposeProvider를 사용하여 가독성을 높이고 중첩 구조를 단순화합니다.
 */
export default function AppProvider({ children }: React.PropsWithChildren) {
  return (
    <ComposeProvider
      /* 
        [Provider 배치 순서 가이드]
        - 배열의 위쪽에 있을수록 '바깥쪽(부모)'에 위치하게 됩니다.
        - 아래쪽(자식)에 있는 Provider는 위쪽(부모)의 상태에 접근할 수 있습니다.
      */
      providers={[
        // 인증 상태 (모든 곳에서 유저 정보가 필요함)
        <AuthProvider />, 
        
        // 테마 상태 (인증 여부와 상관없이 작동 가능)
        <ThemeProvider />, 
        
        // 라우터 상태 (URL 주소에 따라 화면을 전환)
        // ↓ 여기에 라우터 프로바이더를 추가합니다.
        
        /* 
          모달 상태 
          - 인증 정보(useAuth) 확인 가능
          - 테마(useTheme) 적용 가능
          - 페이지 이동(useNavigate) 가능
        */
        <ModalProvider />, 

        /* 
          콜렉션 상태
          - 포켓몬 수집 데이터 및 트레이너 정보 관리
          - 인증 정보(useAuth)를 기반으로 사용자별 데이터 동기화
        */
        <CollectionProvider />,
      ]}
    >
      {children}
    </ComposeProvider>
  )
}