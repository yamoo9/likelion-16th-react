import { useState } from 'react'
import staffData from './data/staff.json'
import type { Staff } from './type/staff'
import StaffListInfo from './parts/StaffListInfo'
import StaffListSearch from './parts/StaffListSearch'
import StaffList from './parts/StaffList'
import S from './style.module.css'

export default function StaffListWithFilter() {
  const [staffs] = useState<Staff[]>(staffData)

  return (
    <section className={S.container}>
      <StaffListInfo staffs={staffs} />
      <StaffListSearch />
      <StaffList staffs={staffs} />
    </section>
  )
}
