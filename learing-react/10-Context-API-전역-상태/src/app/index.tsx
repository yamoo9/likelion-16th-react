import { ContextAdvanced } from '@/_/learns'
import { AuthProvider, FamilyProvider } from '@/contexts'
import S from './style.module.css'

export default function App() {
  return (
    <AuthProvider>
      <FamilyProvider>
        <div className={S.container}>
          <ContextAdvanced />
        </div>
      </FamilyProvider>
    </AuthProvider>
  )
}
