import { Users, Plus, MoreVertical } from 'lucide-react'
import { cn } from '@/utils'

const MEMBERS = [
  { name: '문준혁', role: '디자인 리드', color: 'bg-sky-400' },
  { name: '강서아', role: '프론트엔드 개발자', color: 'bg-teal-400' },
  { name: '위지훈', role: '프로덕트 매니저', color: 'bg-orange-400' },
]

export default function TeamPage() {
  return (
    <div className="flex h-full flex-col text-white">
      <header className="mb-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-white/10 p-2">
            <Users className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-bold">팀 멤버</h2>
        </div>
        <button type="button" className="cursor-pointer rounded-full bg-white/10 p-2 transition-colors hover:bg-white/20">
          <Plus className="h-5 w-5" />
        </button>
      </header>

      <div className="grow space-y-4">
        {MEMBERS.map((member) => (
          <a
            key={member.name}
            href="#"
            className={cn(
              'flex items-center justify-between rounded-2xl p-4',
              'cursor-pointer border border-white/10 bg-white/5 transition-all hover:bg-white/10',
            )}
          >
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  'flex h-11 w-11 items-center justify-center rounded-full font-bold text-slate-900',
                  member.color,
                )}
              >
                {member.name.at(0)}
              </div>
              <div>
                <p className="text-sm font-bold">{member.name}</p>
                <p className="text-xs text-slate-400">{member.role}</p>
              </div>
            </div>
            <MoreVertical className="h-4 w-4 text-slate-500" />
          </a>
        ))}
      </div>

      <div className="mt-8 rounded-2xl bg-linear-to-br from-blue-600 to-indigo-700 p-6">
        <p lang="en" className="mb-1 text-[11px] font-bold opacity-80">Pro Plan</p>
        <p className="text-sm font-bold">
          더 많은 팀원을 초대하고
          <br />
          협업 기능을 활성화하세요.
        </p>
      </div>
    </div>
  )
}
