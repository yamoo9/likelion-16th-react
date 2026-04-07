import { type ComponentProps, useId } from "react"
import { cn } from "@/utils"

export function PostTextarea({
  label,
  className,
  ...restProps
}: ComponentProps<'textarea'> & { label: string; className?: string }) {
  const textareaId = useId()

  return (
    <div className="flex flex-col space-y-2">
      <label
        htmlFor={textareaId}
        className="ml-1 text-sm font-bold tracking-wider text-slate-500 uppercase"
      >
        {label}
      </label>
      <textarea
        id={textareaId}
        rows={4}
        {...restProps}
        className={cn(
          'w-full resize-y min-h-30 max-h-50',
          'rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-3.5 outline-none',
          'focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10',
          'placeholder:text-slate-300',
          className,
        )}
      />
    </div>
  )
}