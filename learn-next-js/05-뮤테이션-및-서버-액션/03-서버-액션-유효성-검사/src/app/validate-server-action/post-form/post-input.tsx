import { type ComponentProps, useId } from 'react'
import { cn } from '@/utils'

export function PostInput({
  label,
  className,
  ...restProps
}: ComponentProps<'input'> & { label: string; className?: string }) {
  const inputId = useId()

  return (
    <div className="flex flex-col space-y-2">
      <label
        htmlFor={inputId}
        className="ml-1 text-sm font-bold tracking-wider text-slate-500 uppercase"
      >
        {label}
      </label>

      <input
        id={inputId}
        type="text"
        {...restProps}
        className={cn(
          'w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-3.5 transition-all outline-none',
          'focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10',
          'placeholder:text-slate-300',
          className,
        )}
      />
    </div>
  )
}
