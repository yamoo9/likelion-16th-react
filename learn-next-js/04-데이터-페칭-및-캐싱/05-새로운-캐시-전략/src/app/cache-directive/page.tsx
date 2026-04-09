import {
  LucideZap,
  LucideClock,
  LucideRefreshCcw,
  LucideInfo,
} from 'lucide-react'

import { cn, wait } from '@/utils'
import { Suspense } from 'react'
import { Spinner } from '@/components/ui/spinner'
import { cacheLife } from 'next/cache'

export default function CacheDirectivePage() {
  return (
    <div className="mx-auto max-w-4xl space-y-10 p-6">
      <header className="space-y-3">
        <div className="flex items-center gap-2 text-blue-600">
          <LucideZap className="h-7 w-7" />
          <h1 className="text-3xl font-black tracking-tight">
            'use cache' 디렉티브
          </h1>
        </div>
        <p className="text-muted-foreground text-lg">
          함수 내부에 선언하는 것만으로 서버 로직의 결과값을 캐싱합니다.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Dynamic */}
        <Suspense fallback={<Spinner />}>
          <DynamicDataCard />
        </Suspense>
        {/* Dynamic */}
        <Suspense fallback={<Spinner />}>
          <CachedDataCard />
        </Suspense>
      </div>

      <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-6">
        <h3 className="mb-2 flex items-center gap-2 font-bold text-blue-900">
          <LucideInfo className="h-5 w-5" />
          어떻게 작동하나요?
        </h3>
        <p className="text-sm leading-relaxed text-blue-800/80">
          새로고침하면 왼쪽 카드는 매번 시간이 바뀌지만, 오른쪽 카드는
          <code className="mx-1 rounded bg-blue-100 px-1 font-bold">
            'use cache'
          </code>
          덕에 서버에서 한 번 계산된 값을 계속 유지합니다.
        </p>
      </div>
    </div>
  )
}

/* [데이터 로직] ----------------------------------------------------------------- */

// 캐싱이 적용되지 않는 함수
async function getDynamicData() {
  await wait(300)

  return {
    time: new Date().toLocaleTimeString(),
    id: Math.random().toString(36).substring(7),
  }
}

// 캐싱이 적용된 함수
async function getCachedData() {
  'use cache'
  // 캐시 라이프 (시간 기반 캐싱/재검증)
  cacheLife('minutes') // 1분

  await wait(300)

  return {
    time: new Date().toLocaleTimeString(),
    id: Math.random().toString(36).substring(7),
  }
}

/* [개별 컴포넌트 분리] ------------------------------------------------------------- */

// 일반 데이터 카드 컴포넌트
async function DynamicDataCard() {
  const data = await getDynamicData() // 동적 데이터 가져오기 (캐시 안 됨)

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8',
        'transition-all hover:border-slate-300 hover:shadow-md',
      )}
    >
      <div className="mb-6 flex items-center justify-between">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
          DYNAMIC
        </span>
        <LucideRefreshCcw className="animate-spin-slow h-5 w-5 text-slate-300" />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium text-slate-400">생성된 시간</p>
        <p className="font-mono text-4xl font-bold text-slate-900">
          {data.time}
        </p>
      </div>
      <div className="mt-4 text-xs text-slate-400">ID: {data.id}</div>
    </div>
  )
}

// 캐시된 데이터 카드 컴포넌트
async function CachedDataCard() {
  const data = await getCachedData() // (캐시된) 동적 데이터 가져오기

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-3xl border-2 border-blue-100 bg-blue-50/30 p-8',
        'transition-all hover:border-blue-200 hover:shadow-md',
      )}
    >
      <div className="mb-6 flex items-center justify-between">
        <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white">
          CACHED
        </span>
        <LucideClock className="h-5 w-5 text-blue-400" />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium text-blue-400">캐시된 시간</p>
        <p className="font-mono text-4xl font-bold text-blue-600">
          {data.time}
        </p>
      </div>
      <div className="mt-4 text-xs text-blue-600/90">
        ID: {data.id} (고정됨)
      </div>
    </div>
  )
}
