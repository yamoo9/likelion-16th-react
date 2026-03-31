import { cn } from '@/utils'

export default function Page() {
  return (
    <div
      className={cn(
        'flex flex-col justify-center items-center',
        'min-h-screen bg-background',
      )}
    >
      <header>
        <h1
          className={cn(
            'text-4xl text-foreground font-extralight',
            'selection:bg-foreground selection:text-background',
          )}
        >
          안녕! Next.js
        </h1>
      </header>
    </div>
  )
}
