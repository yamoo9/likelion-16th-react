import { cloneElement } from 'react'
import Link from 'next/link'
import { cn } from '@/utils'

export const NavigationLink = ({ 
  href, 
  icon, 
  label 
}: { 
  href: string; 
  icon: React.ReactElement; 
  label: string 
}) => (
  <Link
    href={href}
    scroll={false}
    replace
    className={cn(
      'pointer-events-auto p-4 md:p-5 rounded-full transition-all active:scale-95',
      'bg-white/10 text-white backdrop-blur-xl hover:bg-white hover:text-slate-900 shadow-lg'
    )}
    aria-label={label}
  >
    {cloneElement(icon, { 
      className: "h-6 w-6 md:h-8 md:w-8" 
    } as React.HTMLAttributes<SVGElement>)}
  </Link>
)

export const InfoItem = ({ 
  icon, 
  text 
}: { 
  icon: React.ReactElement; 
  text: string 
}) => (
  <div className="flex items-center gap-3">
    {cloneElement(icon, { 
      className: "h-5 w-5 text-blue-500" 
    } as React.HTMLAttributes<SVGElement>)}
    <span className="font-medium text-slate-400">{text}</span>
  </div>
)