import S from './StaffListSearch.module.css'

export default function StaffListSearch() {
  return (
    <search className={S.searchSection}>
      <div className={S.searchField}>
        <label htmlFor="staff-search" className="sr-only">
          스태프 검색 (이름, 역할, 연락처)
        </label>
        <input
          id="staff-search"
          type="search"
          className={S.searchInput}
          placeholder="이름, 역할 또는 연락처로 검색하세요"
        />
        <span className={S.searchIcon} aria-hidden="true">
          🔍
        </span>
      </div>

      <p className={S.searchHelp}>
        * 이름, 담당 업무(예: 주방, 홀), 전화번호 뒷자리로 빠르게 찾을 수
        있습니다.
      </p>
    </search>
  )
}