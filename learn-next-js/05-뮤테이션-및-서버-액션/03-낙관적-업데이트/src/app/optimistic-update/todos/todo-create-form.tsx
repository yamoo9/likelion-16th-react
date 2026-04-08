import { cn } from "@/utils"
import { LucidePlus } from "lucide-react"

export function TodoCreateForm() {
  return (
    <form className="flex flex-col gap-3">
      <div className="relative">
        <input
          name="title"
          required
          placeholder="새로운 할 일을 입력하세요..."
          className={cn(
            'w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-4 pr-12',
            'transition-all outline-none',
            'focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20',
          )}
        />
        <button
          type="submit"
          className={cn(
            'absolute top-1/2 right-2 -translate-y-1/2',
            'flex h-10 w-10 items-center justify-center rounded-xl',
            'bg-blue-600 text-white hover:bg-blue-700',
            'transition-all hover:scale-105 active:scale-95',
          )}
        >
          <LucidePlus className="size-6" />
        </button>
      </div>
    </form>
  )
}