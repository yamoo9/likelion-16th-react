import S from './StaffListNoResult.module.css'

export default function StaffListNoResult() {
  return (
    <div className={S.noResult}>
      <p className={S.noResultText}>
        <strong>"{'검색어'}"</strong>에 대한 검색 결과가 없습니다.
      </p>
      <button className={S.resetBtn}>검색 초기화</button>
    </div>
  )
}
