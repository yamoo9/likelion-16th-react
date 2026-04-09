import { LucideHash } from "lucide-react"

import { Pokemon } from "@/types/pokemon"
import { cn } from "@/utils"

export function PokemonList({ data }: { data: Pokemon[] }) {
  if (!data || data.length === 0) {
    return (
      <div className="py-10 text-center text-slate-400">데이터가 없습니다.</div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((item, index) => (
        <div
          key={item.id || index}
          className={cn(
            'group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-5',
            'transition-all duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-xl',
          )}
        >
          <div className="mb-4 flex items-start justify-between">
            <div className="flex items-center gap-2 rounded-md bg-slate-50 px-2 py-1 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              <LucideHash className="h-3 w-3" />
              {String(item.id || index + 1).padStart(3, '0')}
            </div>
            <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          </div>

          <div className="space-y-1">
            <h3 className="flex items-center gap-2 text-lg font-bold text-slate-800 transition-colors group-hover:text-blue-600">
              <img src={item.image} alt="" className="size-10 text-slate-400" />
              {item.name}
            </h3>
            <p className="line-clamp-2 text-sm leading-relaxed text-slate-500">
              {item.description ||
                '이 포켓몬에 대한 상세 정보가 서버에 등록되지 않았습니다.'}
            </p>
          </div>

          <div className="mt-4 flex gap-2">
            {item.types?.map((type: string) => (
              <span
                key={type}
                className="rounded-md border border-blue-100 bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-500"
              >
                {type}
              </span>
            )) || (
              <span className="text-[11px] text-slate-300 italic">
                No Types
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}