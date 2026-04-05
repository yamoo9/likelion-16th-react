import { cn } from '@/utils'

interface DashboardLayoutProps {
  children: React.ReactNode
  analytics: React.ReactNode
  team: React.ReactNode
}

export default function DashboardLayout({
  children,
  analytics,
  team,
}: DashboardLayoutProps) {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-12 py-12">
      
      {/* 메인 콘텐츠 (children) */}
      <div className="w-full">{children}</div>
  
      {/* 병렬 라우트 섹션 (Slots) */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        
        {/* Analytics 슬롯 카드 */}
        <section
          aria-label="실시간 분석"
          className={cn(
            'rounded-3xl p-12',
            'border border-slate-100 bg-slate-50/50 shadow-inner',
          )}
        >
          {analytics}
        </section>

        {/* Team 슬롯 카드 */}
        <section
          aria-label="팀 멤버"
          className={cn(
            'rounded-3xl p-12',
            'relative overflow-hidden bg-slate-900 shadow-2xl shadow-slate-900/20',
          )}
        >
          {/* 배경 장식 요소 */}
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl" />
          <div className="relative z-10 h-full">{team}</div>
        </section>
      </div>

    </div>
  )
}
