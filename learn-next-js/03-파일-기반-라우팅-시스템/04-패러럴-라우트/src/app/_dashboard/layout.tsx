import { cn } from '@/utils'

export default function DashboardLayout({
  children,
  chart,
  statistics,
  admin,
  user
}: LayoutProps<'/dashboard'>) {
  // 레이아웃 컴포넌트의 Props
  // props.chart      // React.ReactComponent
  // props.statistics // React.ReactComponent
  // props.children   // React.ReactComponent
  // props.params

  const role = checkUserRole()

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
      <div className="grid grid-cols-1 gap-4 self-stretch md:grid-cols-2">
        {/* 방문자 수 통계 페이지 */}
        {statistics}
        {/* 그래프 차트 페이지 */}
        {chart}
      </div>

      <div className="grid grid-cols-1 gap-4 self-stretch md:grid-cols-2">
        {/* 대시보드 페이지 */}
        {children}
        { role === 'admin' ? admin : user }
      </div>
    </div>
  )
}



function checkUserRole(): 'admin' | 'user' {
  return 'user'
}