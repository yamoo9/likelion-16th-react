import { cn } from '@/utils'
import { LucideAlertCircle } from 'lucide-react'

export function PrintError({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className={cn(
        'flex items-center gap-3',
        'rounded-lg border border-red-100',
        'bg-red-50 p-4 text-red-600',
      )}
    >
      <LucideAlertCircle className="size-5" />
      <span className="font-medium">{message}</span>
    </div>
  )
}
