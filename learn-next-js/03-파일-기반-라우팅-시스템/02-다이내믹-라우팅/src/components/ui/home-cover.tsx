import { cn } from '@/utils'

/**
 * [메인 히어로 컴포넌트] HomeCover
 * 홈페이지의 최상단에서 서비스의 정체성과 학습 가이드를 소개합니다.
 */
export default function HomeCover() {
  return (
    <section
      aria-labelledby="hero-title"
      className={cn(
        // 레이아웃: 중앙 정렬 및 초기 위치(translate-y-40) 설정
        'flex translate-y-40 flex-col items-center justify-center text-center',
        'transition-colors duration-500',
        // 애니메이션: 등장 시 서서히 나타나는 효과 (Framer Motion 없이 Tailwind native 활용)
        'motion-safe:animate-in motion-safe:fade-in motion-safe:duration-1000',
      )}
    >
      {/* [상태 배지] 현재 학습 단계나 상태를 알리는 상단 칩(Chip) */}
      <div
        role="status"
        aria-label="현재 학습 가이드 단계: Next.js Routing Guide"
        className={cn(
          'mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 shadow-sm',
          // 라이트/다크 공통: 테두리와 배경색이 시스템 설정(foreground/background)을 따름
          'border-foreground/10 bg-background text-foreground/70',
          'text-xs font-black tracking-[0.2em] uppercase transition-transform hover:scale-105',
          'dark:border-white/10 dark:bg-zinc-900/50', // 다크 모드 보정
        )}
      >
        {/* 활성화 표시등 (Ping 애니메이션) */}
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className="bg-primary/50 absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
          <span className="bg-primary relative inline-flex h-2 w-2 rounded-full" />
        </span>
        <span lang="en" className="font-medium select-none">
          Next.js Routing Guide
        </span>
      </div>

      {/* [메인 헤더] 제목과 핵심 설명을 담은 영역 */}
      <header className="space-y-8">
        {/* 그라데이션 타이틀: 위에서 아래로 흐르는 텍스트 효과 */}
        <h1
          id="hero-title"
          className={cn(
            'max-w-3xl text-5xl leading-[1.05] font-black tracking-tighter md:text-7xl',
            'from-foreground to-foreground/50 bg-linear-to-b bg-clip-text text-transparent',
            'drop-shadow-[0_2px_2px_rgba(0,0,0,0.05)]',
            'dark:from-white dark:to-white/40', // 다크 모드에서 더 밝은 그라데이션
          )}
        >
          디지털 라이브러리에
          <br />
          오신 것을 환영합니다
        </h1>

        {/* 서브 설명 문구 */}
        <p
          className={cn(
            'mx-auto max-w-xl text-base leading-relaxed md:text-xl',
            'text-foreground/60 font-light tracking-tight text-pretty',
            'dark:text-zinc-400', // 다크 모드 텍스트 가독성 확보
          )}
        >
          Next.js의 파일 기반 라우팅을 통해 페이지 간 이동을 실습해보세요.
        </p>
      </header>

      {/* [장식 섹션] 하단의 미니멀한 구분선과 브랜드 텍스트 */}
      <div role="presentation" className="mt-16 flex items-center gap-4">
        {/* 왼쪽 구분선 */}
        <div className="bg-foreground/10 h-px w-16 dark:bg-white/10" />
        <span
          lang="en"
          className="text-foreground/50 font-mono text-[11px] font-bold tracking-widest uppercase dark:text-zinc-500"
        >
          Urban Minimalist Archive
        </span>
        {/* 오른쪽 구분선 */}
        <div className="bg-foreground/10 h-px w-16 dark:bg-white/10" />
      </div>
    </section>
  )
}
