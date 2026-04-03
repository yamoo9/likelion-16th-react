import { cn } from "@/utils"

export default function HomeCover() {
  return (
    <section 
      aria-labelledby="hero-title"
      className={cn(
        'flex flex-col items-center justify-center text-center translate-y-40',
        'transition-colors duration-500',
        'motion-safe:animate-in motion-safe:fade-in motion-safe:duration-1000',
      )}
    >
      <div
        role="status"
        aria-label="현재 학습 가이드 단계: Next.js Routing Guide"
        className={cn(
          'mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 shadow-sm',
          'border-foreground/10 bg-background text-foreground/70',
          'text-xs font-black tracking-[0.2em] uppercase transition-transform hover:scale-105',
        )}
      >
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 bg-primary/50" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
        </span>
        <span lang="en" className="font-medium select-none">Next.js Routing Guide</span>
      </div>

      <header className="space-y-8">
        <h1
          id="hero-title"
          className={cn(
            'max-w-3xl text-5xl leading-[1.05] font-black tracking-tighter md:text-7xl',
            'from-foreground to-foreground/50 bg-linear-to-b bg-clip-text text-transparent',
            'drop-shadow-[0_2px_2px_rgba(0,0,0,0.05)]',
          )}
        >
          디지털 라이브러리에
          <br />
          오신 것을 환영합니다
        </h1>

        <p
          className={cn(
            'mx-auto max-w-xl text-base leading-relaxed md:text-xl',
            'text-foreground/60 font-light tracking-tight text-pretty',
          )}
        >
          Next.js의 파일 기반 라우팅을 통해 페이지 간 이동을 실습해보세요.
        </p>
      </header>

      <div role="presentation" className="mt-16 flex items-center gap-4">
        <div className="bg-foreground/10 h-px w-16" />
        <span
          lang="en"
          className="font-mono text-[11px] font-bold tracking-widest uppercase text-foreground/50"
        >
          Urban Minimalist Archive
        </span>
        <div className="bg-foreground/10 h-px w-16" />
      </div>
    </section>
  )
}