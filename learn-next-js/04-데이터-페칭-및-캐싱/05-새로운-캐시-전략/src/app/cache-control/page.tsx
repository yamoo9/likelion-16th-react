import {
  LucideAlertCircle,
  LucideRefreshCw,
  LucideShieldCheck,
  LucideTag,
  LucideTimer,
} from 'lucide-react'

import { cn } from '@/utils'

export default function CacheControlPage() {
  return (
    <section className="mx-auto max-w-4xl space-y-10 p-6">
      <header className="space-y-3">
        <div className="flex items-center gap-2 text-emerald-600">
          <LucideShieldCheck className="h-7 w-7" />
          <h1 className="text-3xl font-black tracking-tight">
            캐시 수명 및 태그 제어
          </h1>
        </div>
        <p className="text-muted-foreground text-lg">
          캐시가 얼마나 유지될지, 언제 삭제될지 정교하게 설계합니다.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8">
        <ShortLivedSection />
        <TaggedDataSection />
      </div>

      <div className="flex justify-center pt-4">
        <form action="/cache-control">
          <button
            type="submit"
            className={cn(
              'cursor-pointer',
              'flex items-center gap-2 rounded-full px-6 py-3 font-bold text-white',
              'bg-blue-600 shadow-lg shadow-blue-200 transition-colors hover:bg-blue-700',
              'transform transition-transform active:scale-95',
            )}
          >
            <LucideRefreshCw className="size-4" />
            'user-profile' 태그 즉시 업데이트
          </button>
        </form>
      </div>

      <article
        className={cn(
          'flex gap-4 rounded-2xl border border-amber-100 bg-amber-50 p-6',
          'text-amber-700',
        )}
      >
        <LucideAlertCircle className="size-6 shrink-0 translate-y-0.5 text-amber-700" />
        <div className="space-y-1">
          <h3 className="font-bold">참고사항</h3>
          <p className="text-sm leading-relaxed text-amber-800">
            <code>cacheLife</code>와 <code>cacheTag</code>는{' '}
            <code>'use cache'</code> 지시어와 함께 사용되는 새로운 API입니다.
            Next.js 16의 Dynamic I/O 환경에서는 비동기 데이터 접근 시 반드시{' '}
            <code>Suspense</code> 경계가 필요합니다.
          </p>
        </div>
      </article>
    </section>
  )
}

/* [데이터 로직] ----------------------------------------------------------------- */

// [시간 기반 캐싱]
// - 특정 시간이 지나면 자동으로 캐시가 만료됨
// - 수명이 짧은 캐시 (예: 실시간 시세 등)
async function getShortLivedData() {
  return new Date().toLocaleTimeString()
}

// [태그 기반 캐싱]
// - 특정 이름(태그)을 붙여두고, 필요할 때 수동으로 무효화함
// - 태그가 지정된 캐시 (예: 사용자 프로필 등)
async function getTaggedData() {
  return {
    time: new Date().toLocaleTimeString(),
    tag: 'user-profile',
  }
}

/* [하위 컴포넌트 분리] ------------------------------------------------------------- */

// 수명 주기(cacheLife) 시연 컴포넌트
async function ShortLivedSection() {
  const shortLivedTime = await getShortLivedData()

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2 font-bold text-slate-800">
        <LucideTimer className="h-5 w-5 text-emerald-500" />
        <h2>cacheLife: 유효 기간 설정</h2>
      </div>
      <div
        className={cn(
          'rounded-3xl border border-emerald-100 bg-emerald-50/20 p-6',
          'flex flex-col justify-between gap-4 md:flex-row md:items-center',
        )}
      >
        <div>
          <p className="text-sm font-medium text-emerald-700/70">
            설정된 프로필: 'seconds'
          </p>
          <p className="font-mono text-2xl font-bold text-emerald-900">
            {shortLivedTime}
          </p>
        </div>
        <div className="max-w-xs text-sm text-emerald-700/90">
          잠시 후 새로고침하면 값이 바뀝니다. 짧은 주기의 데이터 업데이트에
          적합합니다.
        </div>
      </div>
    </section>
  )
}

// 태그 기반 무효화(cacheTag) 시연 컴포넌트
async function TaggedDataSection() {
  const taggedData = await getTaggedData()

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2 font-bold text-slate-800">
        <LucideTag className="h-5 w-5 text-blue-500" />
        <h2>cacheTag: 정밀 무효화</h2>
      </div>
      <div
        className={cn(
          'rounded-3xl border border-blue-100 bg-blue-50/20 p-6',
          'flex flex-col justify-between gap-4 md:flex-row md:items-center',
        )}
      >
        <div>
          <p className="text-sm font-medium text-blue-700/70">
            부여된 태그: [{taggedData.tag}]
          </p>
          <p className="font-mono text-2xl font-bold text-blue-900">
            {taggedData.time}
          </p>
        </div>
        <div className="max-w-xs text-sm text-blue-700/90">
          이 데이터는 수동으로 태그를 무효화하기 전까지 영구적으로 캐싱될 수
          있습니다.
        </div>
      </div>
    </section>
  )
}
