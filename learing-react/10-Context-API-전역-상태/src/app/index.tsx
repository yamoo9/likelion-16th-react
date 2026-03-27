import { ContextAdvanced } from '@/_/learns'
import { AuthProvider, FamilyProvider, ThemeProvider } from '@/contexts'
import S from './style.module.css'

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <div className={S.container}>
          <FamilyProvider>
            <ContextAdvanced />
          </FamilyProvider>
        </div>
      </ThemeProvider>
    </AuthProvider>
  )
}
