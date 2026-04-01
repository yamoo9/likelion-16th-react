import { cn } from '@/utils'
import { UserList } from './user-list'

export default async function Users() {
  return (
    <section className="mx-auto max-w-md space-y-8 p-8">
      <header className="space-y-4">
        <h2
          className={cn(
            'text-3xl font-black tracking-tighter',
            'bg-linear-to-r from-slate-900 to-slate-500',
            'bg-clip-text text-transparent',
          )}
        >
          팀 매니저
        </h2>
        <p className="text-slate-500 text-sm leading-relaxed">
          서버에서 미리 가져온 데이터(Prefetched Data)를 React Query에서 관리하도록 구성해봅니다.
        </p>
      </header>

      <div
        className={cn(
          'rounded-3xl border border-slate-200 bg-white p-6',
          'shadow-[0_8px_30px_rgb(0,0,0,0.04)]',
        )}
      >
        <UserList />
      </div>
    </section>
  )
}
