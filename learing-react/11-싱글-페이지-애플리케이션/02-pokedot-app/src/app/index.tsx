import { AuthProvider } from '@/contexts/AuthContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { ModalProvider } from '@/contexts/ModalContext'
import { CollectionProvider } from '@/contexts/CollectionContext'
import S from './style.module.css'
import '@/styles/main.css'

export default function App() {
  return (
    // AppProvider를 사용해 프로바이더 래퍼 헬 문제를 해결해보세요.
    <AuthProvider>
      <ThemeProvider>
        <ModalProvider>
          <CollectionProvider> {/* 🤯 */}

            <div className={S.container}>
              {/* 앱 내비게이션 컴포넌트를 추가합니다.  */}

              <main>
                {/* 
                  앱 라우트(routes)를 구성합니다.
                  - src/pages 폴더의 페이지 컴포넌트를 확인하세요.
                */}
              </main>
            </div>

          </CollectionProvider>
        </ModalProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}
