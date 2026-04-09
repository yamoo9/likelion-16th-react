import Link from 'next/link'
import { cn } from '@/utils'

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center p-8">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="space-y-2">
          <h1 className="text-6xl font-extrabold tracking-tighter">
            404
          </h1>
          <h2 className="text-3xl font-bold tracking-tight">
            페이지를 찾을 수 없습니다
          </h2>
          <p className="text-muted-foreground">
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          </p>
        </div>
        <div className="bg-card rounded-lg border p-8 shadow-sm">
          <div className="bg-muted mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={cn('text-muted-foreground h-10 w-10')}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-xl font-semibold">
            페이지를 찾을 수 없습니다
          </h3>
          <p className="text-muted-foreground mb-4 text-sm">
            입력하신 주소가 올바른지 확인해주세요.
          </p>
          <Link
            href="/"
            className={cn(
              'bg-foreground text-background hover:bg-primary/90 focus:ring-primary inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none',
            )}
          >
            메인 페이지로 이동
          </Link>
        </div>
      </div>
    </section>
  )
}
