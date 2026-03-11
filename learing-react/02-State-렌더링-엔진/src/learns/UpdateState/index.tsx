import BatchCounter from './BatchCounter'
import S from './style.module.css'

export default function UpdateState() {
  return (
    <section className={S.container}>
      <h2 className='sr-only'>상태 업데이트</h2>
      <BatchCounter />
    </section>
  )
}
