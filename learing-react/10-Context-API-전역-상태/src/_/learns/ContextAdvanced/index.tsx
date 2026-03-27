import GrandFather from './parts/GrandFather'
import S from './style.module.css'

export default function ContextAdvanced() {
  
  return (
    <section className={`${S.box} ${S.container}`}>
      <h1 className={S.title}>깊숙히 컴포넌트 Props 전달</h1>
      <GrandFather />
    </section>
  )
}