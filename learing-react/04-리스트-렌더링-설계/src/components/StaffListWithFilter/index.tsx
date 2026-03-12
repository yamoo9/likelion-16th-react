import { useState } from 'react'
import StaffData from './data/staff.json'
import type { Staff } from './type/staff'
import StaffListSearch from './parts/StaffListSearch'
import S from './style.module.css'

export default function StaffListWithFilter() {
  const [staffs] = useState<Staff[]>(StaffData)

  return (
    <section className={S.container}>
      <header className={S.header}>
        <h2>알바생 관리 명부</h2>
        <span className={S.count}>
          검색된 인원: {staffs.length} / 총원: {staffs.length}명
        </span>
      </header>

      <StaffListSearch />

      {staffs.length > 0 ? (
        <ul className={S.grid}>
          {staffs.map((staff, index) => {
            const isActive = staff.status === 'active'
            const statusLabel = isActive ? '출근 중' : '대기 중'

            return (
              <li key={index} className={S.card}>
                <span
                  className={`${S.statusBadge} ${isActive ? S.active : ''}`}
                  role="status"
                  aria-label={statusLabel}
                  title={statusLabel}
                >
                  <span className="sr-only">{statusLabel}</span>
                </span>

                <strong className={S.name}>{staff.name}</strong>
                <span className={S.role}>{staff.role}</span>

                <div className={S.infoGroup}>
                  <div className={S.infoRow}>
                    <span className={S.label}>시급</span>
                    <span className={S.value}>
                      {staff.wage.toLocaleString()}원
                    </span>
                  </div>
                  <div className={S.infoRow}>
                    <span className={S.label}>연락처</span>
                    <span className={S.value}>{staff.phone}</span>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      ) : (
        <div className={S.noResult}>
          <p className={S.noResultText}>
            <strong>"{'검색어'}"</strong>에 대한 검색 결과가 없습니다.
          </p>
          <button className={S.resetBtn}>검색 초기화</button>
        </div>
      )}
    </section>
  )
}
