import { Settings, Bell, Lock, User, ChevronRight } from 'lucide-react'
import { cn } from '@/utils'

const SETTING_OPTIONS = [
  {
    id: 'profile',
    icon: User,
    label: '프로필 설정',
    desc: '사용자 이름 및 프로필 이미지를 관리합니다.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    id: 'notif',
    icon: Bell,
    label: '알림 설정',
    desc: '푸시 알림 및 이메일 수신 여부를 선택합니다.',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
  },
  {
    id: 'security',
    icon: Lock,
    label: '보안 및 비밀번호',
    desc: '계정 보안을 위한 2단계 인증을 설정합니다.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
]

export default function SettingsPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 space-y-10 duration-700">
      <header className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-slate-100 p-2">
            <Settings className="h-6 w-6 text-slate-600" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            환경 설정
          </h1>
        </div>
        <p className="font-medium text-slate-500">
          대시보드의 개인화 옵션을 구성하세요.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {SETTING_OPTIONS.map((item) => (
          <div
            key={item.id}
            className={cn(
              'group flex items-center justify-between rounded-[40px] p-8',
              'border border-slate-100 bg-white shadow-sm transition-all duration-300',
              'cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50',
            )}
          >
            <div className="flex items-center gap-8">
              <div
                className={cn(
                  'flex h-16 w-16 items-center justify-center rounded-3xl',
                  item.bg,
                )}
              >
                <item.icon className={cn('h-7 w-7', item.color)} />
              </div>
              <div>
                <h3 className="mb-1 text-xl font-bold text-slate-900">
                  {item.label}
                </h3>
                <p className="text-slate-500">{item.desc}</p>
              </div>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 transition-colors group-hover:bg-slate-900 group-hover:text-white">
              <ChevronRight className="h-5 w-5" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center rounded-[48px] border border-dashed border-slate-200 bg-slate-50 p-10 text-center">
        <p className="mb-4 font-medium text-slate-400">
          더 많은 설정이 곧 추가될 예정입니다.
        </p>
        <button className="rounded-full border border-slate-200 bg-white px-8 py-3 text-sm font-bold text-slate-600 shadow-sm transition-colors hover:bg-slate-50">
          업데이트 소식 받기
        </button>
      </div>
    </div>
  )
}
