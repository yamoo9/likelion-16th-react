import { DerivedState } from '@/components'
import S from './style.module.css'

export default function App() {
  return (
    <div className={S.container}>
      <DerivedState />
    </div>
  )
}
