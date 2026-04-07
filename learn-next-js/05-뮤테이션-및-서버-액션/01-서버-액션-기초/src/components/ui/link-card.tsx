import Link from 'next/link'
import { LucideArrowRight, type LucideProps } from 'lucide-react'
import { cn } from '@/utils'

interface Props {
  href: string
  title: string
  description: string | React.ReactNode
  actionLabel: string
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >
  color?: 'blue' | 'emerald' | 'rose' | 'amber'
}

const colorMap = {
  blue: {
    link: 'hover:border-blue-500',
    circle: 'bg-blue-50',
    iconBg: 'bg-blue-50 p-4 text-blue-600 group-hover:bg-blue-600',
    actionLabel: 'text-blue-600',
  },
  emerald: {
    link: 'hover:border-emerald-500',
    circle: 'bg-emerald-50',
    iconBg: 'bg-emerald-50 p-4 text-emerald-600 group-hover:bg-emerald-600',
    actionLabel: 'text-emerald-600',
  },
  rose: {
    link: 'hover:border-rose-500',
    circle: 'bg-rose-50',
    iconBg: 'bg-rose-50 p-4 text-rose-600 group-hover:bg-rose-600',
    actionLabel: 'text-rose-600',
  },
  amber: {
    link: 'hover:border-amber-500',
    circle: 'bg-amber-50',
    iconBg: 'bg-amber-50 p-4 text-amber-600 group-hover:bg-amber-600',
    actionLabel: 'text-amber-600',
  },
}

export default function LinkCard({
  href,
  title,
  description,
  actionLabel,
  icon: Icon,
  color = 'blue',
}: Props) {
  const styles = colorMap[color]

  return (
    <Link
      href={href}
      className={cn(
        'group relative overflow-hidden p-10',
        'rounded-[2.5rem] border border-slate-100 bg-white shadow-2xl shadow-slate-200/50',
        'transition-all duration-500 hover:-translate-y-2 -tracking-tight',
        styles.link,
      )}
    >
      <div
        className={cn(
          'absolute -top-4 -right-4 h-32 w-32 rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-100',
          styles.circle,
        )}
      />

      <div className="relative z-10 space-y-6">
        <div
          className={cn(
            'inline-flex rounded-3xl transition-all duration-500 group-hover:text-white',
            styles.iconBg,
          )}
        >
          <Icon className="h-8 w-8" />
        </div>

        <div className="space-y-2">
          <h3 className="text-3xl font-black tracking-tight text-slate-900">
            {title}
          </h3>
          <p className="leading-relaxed font-medium text-slate-400">
            {description}
          </p>
        </div>

        <div
          className={cn(
            'flex items-center gap-2 pt-2 text-sm font-black',
            styles.actionLabel,
          )}
        >
          <span>{actionLabel}</span>
          <LucideArrowRight className="size-4 transition-transform duration-400 group-hover:translate-x-2" />
        </div>
      </div>
    </Link>
  )
}
