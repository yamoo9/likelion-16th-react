import S from './RaceCondition.module.css'

export default function RaceCondition() {

  return (
    <article className={S.container}>
      <header className={S.searchField}>
        <h2 className={S.title}>사용자 검색 시스템</h2>
        <label htmlFor="user-search">조회할 사용자 ID (1~20)</label>
        <input
          id="user-search"
          type="number"
          min="1"
          max="20"
          placeholder="ID를 입력하세요..."
          aria-describedby="search-helper"
        />
        <span id="search-helper" className={S.helperText}>
          1부터 20 사이의 숫자를 입력하면 자동으로 검색됩니다.
        </span>
      </header>
      
    </article>
  )
}