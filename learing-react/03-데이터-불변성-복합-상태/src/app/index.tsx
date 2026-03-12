import { Debugging } from '@/practices'
import S from './style.module.css'

export default function App() {
  console.log('App 렌더링')

  return (
    <div className={S.container}>
      <Debugging />
    </div>
  )
}
