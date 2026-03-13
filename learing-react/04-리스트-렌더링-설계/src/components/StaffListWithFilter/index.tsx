import { useState } from 'react'
import staffData from './data/staff.json'
import type { Staff } from './type/staff'
import StaffListInfo from './parts/StaffListInfo'
import StaffListSearch from './parts/StaffListSearch'
import StaffList from './parts/StaffList'
import S from './style.module.css'

export default function StaffListWithFilter() {
  const [staffs] = useState<Staff[]>(staffData)
  const [search, setSearch] = useState('')

  // 파생된 상태(데이터)
  // 검색어에 의해 걸러진 스태프 목록
  const searchedStaffs = staffs.filter((staff) => {
    const hasName = staff.name.toLowerCase().includes(search.toLowerCase().trim())
    const hasRole = staff.role.toLowerCase().includes(search.toLowerCase().trim())
    const hasPhone = staff.phone.toLowerCase().includes(search.toLowerCase().trim())
    return hasName || hasRole || hasPhone
  })

  return (
    <section className={S.container}>
      <StaffListInfo staffs={staffs} searchedStaffs={searchedStaffs} />
      <StaffListSearch search={search} setSearch={setSearch} />
      <StaffList staffs={searchedStaffs} />
    </section>
  )
}
