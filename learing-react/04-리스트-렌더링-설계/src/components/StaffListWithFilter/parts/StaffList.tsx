import type { Staff } from '../type/staff'
import StaffListNoResult from './StaffListNoResult'
import S from './StaffList.module.css'
import StaffListCard from './StaffListCard'

interface StaffListProps {
  staffs: Staff[]
}

export default function StaffList({ staffs }: StaffListProps) {
  
  if (staffs.length === 0) {
    return <StaffListNoResult />
  }

  return (
    <ul className={S.grid}>
      {staffs.map((staff, index) => {
        const isActive = staff.status === 'active'

        return (
          <StaffListCard key={index} isActive={isActive} staff={staff} />
        )
      })}
    </ul>
  )
}
