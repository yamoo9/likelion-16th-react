import { Users } from 'lucide-react'

export default function TeamDefault() {
  return (
    <div className="flex h-full flex-col text-white/50">
      <header className="flex items-center justify-between mb-10 opacity-50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/5 rounded-lg">
            <Users className="h-5 w-5 text-white/40" />
          </div>
          <h2 className="text-xl font-bold">팀 멤버</h2>
        </div>
      </header>

      <div className="grow flex flex-col items-center justify-center space-y-3">
        <div className="h-10 w-10 rounded-full bg-white/5 animate-pulse" />
        <div className="h-10 w-10 rounded-full bg-white/5 animate-pulse delay-75" />
        <div className="h-10 w-10 rounded-full bg-white/5 animate-pulse delay-150" />
        <p className="text-xs font-medium mt-4">멤버 정보를 확인하고 있습니다.</p>
      </div>

      <div className="mt-8 p-6 rounded-4xl bg-white/5 border border-white/10">
        <div className="h-4 w-24 bg-white/10 rounded animate-pulse mb-2" />
        <div className="h-3 w-40 bg-white/5 rounded animate-pulse" />
      </div>
    </div>
  );
}