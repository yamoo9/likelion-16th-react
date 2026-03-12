import S from './TodoSearch.module.css'

export default function TodoSearch() {
  
  return (
    <section className={S.container}>
      <header>
        <h2>사용자 ID로 할 일 찾기</h2>
        <p className={S.info}>사용자 ID를 입력해 목록을 확인하세요.</p>
      </header>

      <div className={S.searchField}>
        <label htmlFor="user-id-input" className="sr-only">
          사용자 ID
        </label>
        <input
          id="user-id-input"
          type="number"
          min={1}
          max={20}
          placeholder="사용자 ID를 입력하세요 (예: 1 ~ 20)"
        />
      </div>

      {/* 할 일 목록 템플릿 */}
      <ul className={S.list}>
        <li className={S.item}>
          <span className={S.textContent}>
            아직 완료 못한 일
          </span>
          <span aria-label="예정" style={{ opacity: 0.3 }}>
            ❎
          </span>
        </li>
        <li className={S.item}>
          <span className={`${S.textContent} ${S.completed}`}>
            완료한 일
          </span>
          <span aria-label="완료" style={{ opacity: 1 }}>
            ✅
          </span>
        </li>
      </ul>

      {/* 상태 알림 템플릿 */}
      <div role="status" className={S.statusRegion}>
        {/* 데이로 로딩 중 표시 메시지 */}
        <p className={S.loading}>데이터를 가져오고 있습니다...</p>
        {/* 검색 결과가 없을 경우 표시 메시지 */}
        <p>검색 결과가 없습니다.</p>
      </div>
    </section>
  )
}
