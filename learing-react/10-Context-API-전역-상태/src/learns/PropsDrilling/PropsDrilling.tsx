import S from './PropsDrilling.module.css'
import GrandFather from './parts/GrandFather'

export default function PropsDrilling() {

  return (
    <section className={`${S.box} ${S.container}`}>
      <h1 className={S.title}>깊숙히 컴포넌트 Props 전달</h1>
      <GrandFather />
    </section>
  )
}
