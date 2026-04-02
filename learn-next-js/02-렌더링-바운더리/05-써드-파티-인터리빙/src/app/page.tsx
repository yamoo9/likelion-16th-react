import { Users } from '@/_learn'
import { cn } from '@/utils'

export default function MainPage() {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-start gap-5',
        'bg-background min-h-screen',
      )}
    >
      <header hidden>
        <h1
          className={cn(
            'text-foreground text-center text-4xl font-extralight',
            'selection:bg-foreground selection:text-background',
          )}
        >
          써드 파티 라이브러리
          <br />
          <span
            lang="en"
            className="inline-block -translate-y-2.5 text-xl text-slate-500"
          >
            Third Party Library Interleaving
          </span>
        </h1>
      </header>

      <main>
        <Users />
      </main>
    </div>
  )
}
