import { cn } from '@/utils'

export default function Page() {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center',
        'bg-background min-h-screen',
      )}
    >
      <header>
        <h1 className={cn('text-foreground text-4xl font-extralight')}>
          안녕! Next.js
        </h1>
      </header>
    </div>
  )
}
