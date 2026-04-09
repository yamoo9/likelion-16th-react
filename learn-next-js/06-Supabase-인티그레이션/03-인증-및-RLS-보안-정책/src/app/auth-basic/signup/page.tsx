import { LucideChevronLeft } from 'lucide-react'
import Link from 'next/link'

import { cn } from '@/utils'
import { AuthForm } from '../auth-form'

export default function SignUpPage() {
  return (
    <div 
      className={cn(
        "mx-auto w-9/10 max-w-3xl px-6 py-12",
        "animate-in fade-in duration-500"
      )}
    >
      <Link
        href="/auth-basic"
        className={cn(
          "mb-6 inline-flex items-center gap-1",
          "text-sm font-bold text-slate-400 transition-colors",
          "hover:text-slate-600 active:scale-95"
        )}
      >
        <LucideChevronLeft className="size-4" />
        돌아가기
      </Link>

      <AuthForm mode="signup" />
    </div>
  )
}
