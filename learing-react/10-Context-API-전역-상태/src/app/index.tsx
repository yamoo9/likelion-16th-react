import { ContextAdvanced } from '@/_/learns'
import { AuthProvider, FamilyProvider, ThemeProvider } from '@/contexts'
import S from './style.module.css'
import { ModalProvider } from '@/contexts/ModalContext'
import { GlobalModal } from '@/components/GlobalModal'

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ModalProvider>
          <div className={S.container}>
            <FamilyProvider>
              <ContextAdvanced />
            </FamilyProvider>
          </div>
          <GlobalModal />
        </ModalProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}
