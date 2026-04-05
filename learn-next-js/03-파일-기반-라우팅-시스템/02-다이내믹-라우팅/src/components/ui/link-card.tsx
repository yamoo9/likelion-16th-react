import Link from 'next/link'
import { LucideArrowRight, LucideIcon } from 'lucide-react'
import { cn } from '@/utils'

interface Props {
  href: string
  title: string
  description: string
  icon: LucideIcon
}

export default function LinkCard({ href, title, description, icon: Icon }: Props) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Link
        href={href}
        className={cn(
          'group hover:border-primary/50 relative flex flex-col justify-between overflow-hidden',
          'rounded-xl border p-6 shadow-sm transition-all',
          'focus-visible:ring-foreground focus-visible:ring-2 ring-offset-2 focus-visible:outline-none',
        )}
      >
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="text-foreground transition-colors group-hover:text-primary flex items-center gap-2 font-semibold">
              <Icon className="h-5 w-5" aria-hidden="true" />{' '}
              <span>{title}</span>
            </div>

            <p className="text-muted-foreground text-sm transition-colors group-hover:text-primary/90 pr-10">
              {description}
            </p>
          </div>
          <LucideArrowRight
            className="text-muted-foreground group-hover:text-primary h-5 w-5 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </div>
      </Link>
    </div>
  )
}
