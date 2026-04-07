import { cn } from '@/utils'
import Statistics from './statistics'
import Chart from './chart'

export default function DashboardLayout({
  children,
}: LayoutProps<'/dashboard'>) {
  return (
    <div className="flex flex-col items-start gap-4 border-4 border-stone-100 p-5">
      <strong
        className={cn(
          'rounded-full px-4 py-2',
          'border-blue-700 bg-blue-50 text-blue-600',
        )}
      >
        대시보드 레이아웃
      </strong>

      {/* 2 컬럼 레이아웃 박스 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 self-stretch">
        {/* 방문자 수 통계 */}
        <Statistics />
        {/* 그래프 차트 */}
        <Chart />
      </div>

      {/* 대시보드 페이지 */}
      {children}
      
    </div>
  )
}
