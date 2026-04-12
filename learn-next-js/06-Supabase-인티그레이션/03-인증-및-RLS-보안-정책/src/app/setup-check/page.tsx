import {
  LucideArrowRight,
  LucideCheckCircle2,
  LucideSettings2,
  LucideShieldCheck,
  LucideXCircle
} from 'lucide-react'
import Link from 'next/link'

import { supabaseConfig } from '@/lib/supabase/config'
import { createClient } from '@/lib/supabase/server'
import { cn, isErrorObject } from '@/utils'

export default async function SetupCheckPage() {
  let isConnected = false
  let errorMessage = ''

  try {
    const supabase = await createClient()
    const { error } = await supabase.auth.getSession()
    if (error) throw error
    isConnected = true
  } catch (error) {
    if (isErrorObject(error)) {
      isConnected = false
      errorMessage = error.message || 'Supabase 연결에 실패했습니다.'
    } else {
      isConnected = false
      errorMessage = error ? String(error) : '알 수 없는 에러가 발생했습니다.'
    }
  }

  return (
    <section className={cn(
      "w-80/100 max-w-3xl px-6 py-12 antialiased",
      "mx-auto"
    )}>
      <header className="mb-10">
        <div className="flex items-center gap-4">
          <div className={cn(
            "inline-flex size-14 items-center justify-center rounded-2xl bg-slate-50 shadow-sm border border-slate-100",
            isConnected ? "bg-emerald-50 border-emerald-100" : "bg-rose-50 border-rose-100"
          )}>
            {isConnected ? (
              <LucideShieldCheck className="size-7 text-emerald-600" />
            ) : (
              <LucideSettings2 className="size-7 text-rose-600" />
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Supabase 연결 상태 확인
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              환경 변수 설정 및 클라이언트 통신 상태를 점검합니다.
            </p>
          </div>
        </div>
      </header>

      <div className="space-y-6">
        <CheckConnectSupabase
          isConnected={isConnected}
          supabaseConfig={supabaseConfig}
          errorMessage={errorMessage}
        />
      </div>
    </section>
  )
}

function CheckConnectSupabase({
  isConnected = false,
  errorMessage,
  supabaseConfig,
}: {
  isConnected?: boolean
  errorMessage: string
  supabaseConfig: { url: string; key: string }
}) {
  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-4xl border-2 bg-white p-8 shadow-sm transition-all",
        isConnected ? "border-emerald-400" : "border-rose-600"
      )}
    >
      {/* 장식용 배경 요소 */}
      <div className={cn(
        "absolute -top-10 -right-10 size-32 rounded-full opacity-70",
        isConnected ? "bg-emerald-50/50" : "bg-rose-50/50"
      )} />

      <div className="relative z-10">
        <h2 className={cn(
          "mb-2 text-lg font-bold tracking-tight",
          isConnected ? "text-emerald-700" : "text-rose-700"
        )}>
          {isConnected ? "연결 성공!" : "환경 설정 확인"}
        </h2>

        <p className="mb-6 text-sm leading-relaxed font-medium text-slate-500">
          {isConnected ? (
            "Supabase 클라이언트가 정상적으로 작동하고 있습니다. 이제 데이터를 다룰 준비가 되었습니다."
          ) : (
            <>
              아래 환경 변수가 <code className="rounded bg-rose-50 px-1.5 py-0.5 font-mono text-xs text-rose-700">.env</code> 또는 <code className="rounded bg-rose-50 px-1.5 py-0.5 font-mono text-xs text-rose-700">.env.local</code>에 설정되어 있는지 확인하세요.
            </>
          )}
        </p>

        <ul className="mb-8 space-y-3">
          <li className="flex items-center justify-between border-b border-slate-50 pb-2.5 text-sm font-semibold">
            <span className="text-slate-600">NEXT_PUBLIC_SUPABASE_URL</span>
            <span className={cn(
              "flex items-center",
              supabaseConfig.url ? "text-emerald-600" : "text-rose-500"
            )}>
              {supabaseConfig.url ? <LucideCheckCircle2 className="mr-1.5 size-4" /> : <LucideXCircle className="mr-1.5 size-4" />}
              {supabaseConfig.url ? "설정됨" : "누락됨"}
            </span>
          </li>
          <li className="flex items-center justify-between border-b border-slate-50 pb-2.5 text-sm font-semibold">
            <span className="text-slate-600">NEXT_PUBLIC_SUPABASE_ANON_KEY</span>
            <span className={cn(
              "flex items-center",
              supabaseConfig.key ? "text-emerald-600" : "text-rose-500"
            )}>
              {supabaseConfig.key ? <LucideCheckCircle2 className="mr-1.5 size-4" /> : <LucideXCircle className="mr-1.5 size-4" />}
              {supabaseConfig.key ? "설정됨" : "누락됨"}
            </span>
          </li>
        </ul>

        {errorMessage && (
          <div className="mb-6 rounded-2xl border border-rose-100 bg-rose-50 p-4 font-mono text-xs text-rose-600">
            <p className="mb-1 font-bold">[에러 메시지]</p>
            <p className="pl-0.5 break-all leading-relaxed">{errorMessage}</p>
          </div>
        )}

        <Link
          href="/setup-check"
          className={cn(
            "flex items-center text-sm font-bold transition-opacity hover:opacity-80",
            isConnected ? "text-emerald-600" : "text-rose-600"
          )}
        >
          연결 상태 다시 테스트 <LucideArrowRight className="ml-1.5 size-4" />
        </Link>
      </div>
    </article>
  )
}