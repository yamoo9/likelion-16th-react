import { useTheme } from '@/contexts'
import GrandFather from './parts/GrandFather'
import S from './style.module.css'

export default function ContextAdvanced() {

  const { toggle } = useTheme()
  
  return (
    <section className={`${S.box} ${S.container}`}>
      <h1 className={S.title}>깊숙히 컴포넌트 Props 전달</h1>
      <button type="button" onClick={toggle}>테마 스위치</button>
      <GrandFather />
    </section>
  )
}