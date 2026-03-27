import { ContextAdvanced } from '@/_/learns'
import { FamilyProvider } from '@/contexts/FamilyContext/provider'
import S from './style.module.css'

export default function App() {
  return (
    <FamilyProvider>
      <div className={S.container}>
        <ContextAdvanced />
      </div>
    </FamilyProvider>
  )
}
