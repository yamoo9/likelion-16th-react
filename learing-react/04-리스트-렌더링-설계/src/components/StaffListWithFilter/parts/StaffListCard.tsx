import type { Staff } from '../type/staff'
import S from './StaffListCard.module.css'

interface StaffListCardProps {
  isActive: boolean
  staff: Staff
}

export default function StaffListCard({ isActive, staff }: StaffListCardProps) {
  const statusLabel = isActive ? '출근 중' : '대기 중'

  return (
    <li className={S.card}>
      <span
        role="status"
        aria-label={statusLabel}
        title={statusLabel}
        className={`${S.statusBadge} ${isActive ? S.active : ''}`}
      />

      <strong className={S.name}>{staff.name}</strong>
      <span className={S.role}>{staff.role}</span>

      <div className={S.infoGroup}>
        <div className={S.infoRow}>
          <span className={S.label}>시급</span>
          <span className={S.value}>{staff.wage.toLocaleString()}원</span>
        </div>
        <div className={S.infoRow}>
          <span className={S.label}>연락처</span>
          <span className={S.value}>{staff.phone}</span>
        </div>
      </div>
    </li>
  )
}
