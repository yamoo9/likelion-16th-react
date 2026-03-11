import S from './style.module.css'

export default function ShiftManager() {
  return (
    <section className={S.container}>
      <header className={S.header}>
        <h2 id="manager-title">오늘의 근무 순서 조정</h2>
        <p className={S.guide}>
          기본 메시지를 확인하고, <strong>추가 메모를 작성</strong>한 뒤 순서를
          섞어보세요.
        </p>
        <button
          type="button"
          className={S.reorderBtn}
          aria-controls="staff-list"
        >
          근무 순서 무작위 재배치
        </button>
      </header>
    </section>
  )
}
