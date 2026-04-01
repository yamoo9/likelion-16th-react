import { cn } from '@/utils'

export default function Page() {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-5',
        'bg-background min-h-screen',
      )}
    >
      <header>
        <h1
          className={cn(
            'text-foreground text-center text-4xl font-extralight',
            'selection:bg-foreground selection:text-background',
          )}
        >
          컨텍스트 프로바이더
          <br />
          <span
            lang="en"
            className="inline-block -translate-y-2.5 text-xl text-slate-500"
          >
            Context Provider Interleaving
          </span>
        </h1>
      </header>
      <main>
        
      </main>
    </div>
  )
}
