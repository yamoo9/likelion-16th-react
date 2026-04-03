import { cn } from '@/utils'
import { Feather, Mail, ShieldHalf } from 'lucide-react'

export default function SiteInfo() {
  const socialIconStyle = cn(
    'text-zinc-400 transition-colors duration-200',
    'hover:text-black dark:hover:text-white',
  )

  return (
    <footer
      className={cn(
        'relative',
        'mt-20 w-full border-t px-6 py-8 transition-colors duration-300',
        'border-gray-100 bg-white',
        'dark:border-zinc-800 dark:bg-zinc-950',
      )}
    >
      <h2 className="sr-only">
        푸터
      </h2>

      <div className="mx-auto max-w-6xl">
        <div
          className={cn(
            'flex flex-col items-center justify-between gap-6 md:flex-row',
            'border-zinc-50 dark:border-zinc-900',
          )}
        >
          <small className="flex flex-col items-center gap-1 md:items-start">
            <span className="block text-xs text-zinc-400 dark:text-zinc-500">
              © {new Date().getFullYear()} URBAN LIB. All rights reserved.
            </span>
            <span className="block text-[10px] text-zinc-300 dark:text-zinc-600">
              Powered by Next.js · Tailwind CSS · Vercel
            </span>
          </small>

          <div className="flex gap-6">
            <a href="#" aria-label="블로그" className={socialIconStyle}>
              <Feather size={20} />
            </a>
            <a href="#" aria-label="보안 정책" className={socialIconStyle}>
              <ShieldHalf size={20} />
            </a>
            <a
              href="mailto:contact@urbanlib.com"
              aria-label="이메일 문의"
              className={socialIconStyle}
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
