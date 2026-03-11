export type ShiftType = '오전' | '오후' | '야간'

export interface Shift {
  id: string
  type: ShiftType
  staffName: string
  startTime: string
  endTime: string
  isCompleted: boolean
}

export interface DailySchedule {
  id: string
  date: string
  dayOfWeek: string
  shifts: Shift[]
}
