// [스타일] 담당 모듈 불러오기
import S from './StaffList.module.css'

// 스태프 목록 렌더링하는 컴포넌트 작성
// 모듈 기본 내보내기
export default function StaffList() {
  const staffs = []
  // 함수 몸체 ([비즈니스 로직])

  // JSX(리액트 엘리먼트 트리) 반환
  // [UI View] 담당

  // 조건에 따라 렌더링 (분기: 나누기)

  // [조건 1] 스태프가 아무도 없다면?
  if (staffs.length === 0) {
    return (
      <div className={S.noResult}>
        <p className={S.noResultText}>
          <strong>"{'검색어'}"</strong>에 대한 검색 결과가 없습니다.
        </p>
        <button className={S.resetBtn}>검색 초기화</button>
      </div>
    )
  }

  // [조건 2] 스태프가 한 명 이상 있다면?
  // return (
  //   <ul className={S.grid}>
  //     {staffs.map((staff, index) => {
  //       const isActive = staff.status === 'active'
  //       const statusLabel = isActive ? '출근 중' : '대기 중'

  //       return (
  //         <li key={index} className={S.card}>
  //           <span
  //             className={`${S.statusBadge} ${isActive ? S.active : ''}`}
  //             role="status"
  //             aria-label={statusLabel}
  //             title={statusLabel}
  //           >
  //             <span className="sr-only">{statusLabel}</span>
  //           </span>

  //           <strong className={S.name}>{staff.name}</strong>
  //           <span className={S.role}>{staff.role}</span>

  //           <div className={S.infoGroup}>
  //             <div className={S.infoRow}>
  //               <span className={S.label}>시급</span>
  //               <span className={S.value}>{staff.wage.toLocaleString()}원</span>
  //             </div>
  //             <div className={S.infoRow}>
  //               <span className={S.label}>연락처</span>
  //               <span className={S.value}>{staff.phone}</span>
  //             </div>
  //           </div>
  //         </li>
  //       )
  //     })}
  //   </ul>
  // )
}
