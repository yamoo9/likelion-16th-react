import { LucideSearch } from 'lucide-react'
import { cn } from '@/utils'

export default function SearchForm() {

  return (
    <form className="mb-12 flex flex-col gap-4 md:flex-row">
      <div className="relative flex-1">
        <LucideSearch className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          name="search"
          placeholder="찾는 도서 제목이나 저자를 입력하세요."
          className={cn(
            'w-full rounded-2xl border border-slate-200',
            'bg-slate-50 py-4 pr-4 pl-12 text-slate-900 transition-all',
            'placeholder:text-slate-400',
            'focus:border-slate-400 focus:ring-2 focus:ring-black/5 focus:outline-none',
          )}
        />
      </div>

      <button
        type="submit"
        className={cn(
          'flex items-center gap-3',
          'rounded-2xl border border-slate-200',
          'bg-white px-6 py-4 shadow-sm transition-colors',
          'hover:bg-slate-50',
        )}
      >
        검색
      </button>
    </form>
  )
}
