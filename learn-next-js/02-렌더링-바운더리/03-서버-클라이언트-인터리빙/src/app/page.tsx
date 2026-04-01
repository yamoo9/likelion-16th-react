import { cn } from '@/utils'

export default function Page() {

  // 서버 컴포넌트 또는 클라이언트 컴포넌트에 서로를 포함해보세요.
  // 어떤 일이 일어나는지 확인하고, 문제가 발생한다면 해결 방법도 살펴봅시다.

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
          인터리빙
          <br />
          <span
            lang="en"
            className="inline-block -translate-y-2.5 text-xl text-slate-500"
          >
            Interleaving
          </span>
        </h1>
      </header>

      <main className="flex flex-col gap-5">
        
      </main>
    </div>
  )
}
