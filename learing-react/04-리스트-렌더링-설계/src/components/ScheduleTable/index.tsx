import S from './style.module.css'

export default function ScheduleTable() {
  return (
    <section className={S.container}>
      <header className={S.header}>
        <h2 id="table-title">월간 근무 시간표</h2>
        <p className={S.desc}>※ 날짜별 오전/오후 근무자 현황입니다.</p>
      </header>
    </section>
  )
}
