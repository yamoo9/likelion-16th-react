import { cn } from '@/utils'
import { Table } from './_resources/table'

export default function DashboardLayout({
  children,    // {children} 화면에 배치
  auth,        // {statistics} 화면에 배치
  chart,       // {chart} 화면에 배치
  statistics,  // {auth} 화면에 배치
}: LayoutProps<'/dashboard'>) {
  return (
    <div className="flex flex-col items-start gap-4 border-4 border-stone-100 p-5">
      <Table />

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
        {/* auth 컴포넌트를 대시보드 내부에 포함시킴 */}
        {auth}
      </div>

    </div>
  )
}



// app/dashboard/page.tsx
// - `/dashboard` 접속 시 {children} 표시될 페이지

// app/dashboard/login/page.tsx (null 반환)
// - `/dashboard/login` 접속 시 {children} 표시될 페이지

// app/dashboard/@auth/page.tsx (로그인 버튼이나 빈 화면)
// - `/dashboard` 접속 시 {auth} 표시될 페이지

// app/dashboard/@auth/default.tsx (null 반환)
// - 매칭되는 경로가 없을 때 보여줄 기본값

// app/dashboard/@auth/page.tsx (실제 로그인 폼)
// - `/dashboard/login` 접속 시 {auth} 표시될 페이지

// app/dashboard/@chart/page.tsx (차트)
// - `/dashboard` 접속 시 {chart} 표시될 페이지

// app/dashboard/@chart/default.tsx (null 반환)
// - `/dashboard/login` 접속 시 표시될 페이지 (없으면 오류)

// app/dashboard/@statistics/page.tsx (통계)
// - `/dashboard` 접속 시 {statistics} 표시될 페이지

// app/dashboard/@statistics/default.tsx (null 반환)
// - `/dashboard/statistics` 접속 시 표시될 페이지 (없으면 오류)