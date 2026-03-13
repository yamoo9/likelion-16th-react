import type { Staff } from '../type/staff'
import S from './StaffListInfo.module.css'

interface Props {
  staffs: Staff[]
  searchedStaffs: Staff[]
}

export default function StaffListInfo({ staffs, searchedStaffs }: Props) {
  return (
    <header className={S.header}>
      <h2>알바생 관리 명부</h2>
      <span className={S.count}>
        검색된 인원: {searchedStaffs.length} / 총원: {staffs.length}명
      </span>
    </header>
  )
}