import { Fragment, useState } from 'react'
import schedulesData from './data/schedule.json'
import type { DailySchedule } from './type/schedule'
import { formatDate } from './util/formatDate'
import S from './style.module.css'

const INITIAL_SCHEDULES: DailySchedule[] = schedulesData

export default function ScheduleTable() {
  const [schedules] = useState(INITIAL_SCHEDULES)

  return (
    <section className={S.container}>
      <header className={S.header}>
        <h2 id="table-title">월간 근무 시간표</h2>
        <p className={S.desc}>※ 날짜별 오전/오후 근무자 현황입니다.</p>
      </header>

      <div
        role="region"
        aria-label="근무 시간표 데이터"
        className={S.tableWrapper}
      >
        <table
          className={S.table}
          aria-description="2024년 3월 월간 근무 시간표이며 날짜, 근무 구분, 담당자, 시간, 완료
            여부 정보를 포함하고 있습니다."
        >
          <caption className="sr-only">2024년 3월 월간 근무 시간표</caption>
          <thead>
            <tr>
              <th scope="col">날짜</th>
              <th scope="col">구분</th>
              <th scope="col">근무자</th>
              <th scope="col">시간</th>
              <th scope="col">상태</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((day) => (
              <Fragment key={day.id}>
                {day.shifts.map((shift, index) => (
                  <tr
                    key={shift.id}
                    className={shift.isCompleted ? S.completed : undefined}
                  >
                    {index === 0 && (
                      <th
                        scope="row"
                        rowSpan={day.shifts.length}
                        className={S.dateCell}
                      >
                        {formatDate(day.date)}{' '}
                        <span className={S.day}>({day.dayOfWeek})</span>
                      </th>
                    )}
                    <td className={S.typeCell}>{shift.type}</td>
                    <td className={S.nameCell}>{shift.staffName}</td>
                    <td className={S.timeCell}>
                      {shift.startTime} ~ {shift.endTime}
                    </td>
                    <td className={S.statusCell}>
                      <span className={ shift.isCompleted ? S.done : S.pending}>
                        { shift.isCompleted ? '완료' : '예정'}
                      </span>
                    </td>
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
