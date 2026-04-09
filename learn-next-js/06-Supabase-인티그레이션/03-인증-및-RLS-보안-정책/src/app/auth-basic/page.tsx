import type { User } from '@supabase/supabase-js'
import {
  LucideInfo,
  LucideLogOut,
  LucideUserCheck,
  LucideUserCircle2,
} from 'lucide-react'
import Link from 'next/link'

import { cn } from '@/utils'
import { signOutAction } from '@/actions/auth-actions'

export default async function AuthBasicPage() {
  // 서버용 Supabase 클라이언트 생성

  // 생성된 Supabase 클라이언트로 인증 사용자 데이터 가져오기
  const user = null

  return (
    <section className="mx-auto w-9/10 max-w-3xl px-6 py-12 antialiased">
      <Header user={user} />

      <div className="space-y-8">
        {user ? (
          /* 로그인 된 상태: 유저 정보 카드 */
          <UserInfoCard user={user} />
        ) : (
          /* 비로그인 상태: 로그인/회원가입 유도 */
          <Encourage />
        )}

        <Info />
      </div>
    </section>
  )
}

function Header({ user }: { user: null | User }) {
  return (
    <header className="mb-10">
      <div className="flex items-center gap-4">
        <div
          className={cn(
            'inline-flex size-14 items-center justify-center rounded-2xl border shadow-sm',
            user
              ? 'border-slate-100 bg-slate-50'
              : 'border-slate-100 bg-slate-50',
          )}
        >
          {user ? (
            <LucideUserCheck className="size-7 text-slate-600" />
          ) : (
            <LucideUserCircle2 className="size-7 text-slate-600" />
          )}
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            인증 (Authentication)
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            사용자의 신원을 확인하고 세션을 관리합니다.
          </p>
        </div>
      </div>
    </header>
  )
}

function UserInfoCard({ user }: { user: null | User }) {
  return (
    <article className="relative overflow-hidden rounded-[40px] border-2 border-slate-400 bg-white p-8 shadow-sm">
      <div
        className="absolute -top-10 -right-10 size-32 rounded-full bg-slate-50/50 opacity-70"
        aria-hidden="true"
      />
      <div className="relative z-10 space-y-6">
        <h2 className="text-lg font-bold text-slate-700">인증된 사용자</h2>
        <dl className="space-y-3 rounded-2xl bg-slate-50 p-6">
          <div className="flex justify-between text-sm">
            <dt className="font-bold text-slate-400 uppercase">Email</dt>
            <dd className="font-mono font-semibold text-slate-700">
              {user?.email}
            </dd>
          </div>
          <div className="flex justify-between text-sm">
            <dt className="font-bold text-slate-400 uppercase">User ID</dt>
            <dd className="font-mono text-xs text-slate-500">{user?.id}</dd>
          </div>
        </dl>
        <form action={signOutAction}>
          <button
            type="submit"
            className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 py-4 font-bold text-white transition-all hover:bg-slate-800 active:scale-[0.98]"
          >
            <LucideLogOut className="size-5 transition-transform group-hover:-translate-x-1" />
            로그아웃 (Sign Out)
          </button>
        </form>
      </div>
    </article>
  )
}

function Encourage() {
  return (
    <div className="rounded-[40px] border-2 border-dashed border-slate-200 bg-slate-50 py-16 text-center">
      <LucideUserCircle2 className="mx-auto mb-4 size-12 text-slate-300" />
      <h2 className="mb-2 text-xl font-bold text-slate-900">세션이 없습니다</h2>
      <p className="mb-8 text-sm text-slate-500">
        서비스 이용을 위해 로그인이 필요합니다.
      </p>
      <div className="flex flex-col justify-center gap-4 px-10 sm:flex-row">
        <Link
          href="/auth-basic/signin"
          className="flex-1 rounded-2xl bg-slate-500 px-8 py-4 font-bold text-white shadow-lg shadow-slate-100 transition-all hover:bg-slate-600"
        >
          로그인
        </Link>
        <Link
          href="/auth-basic/signup"
          className="flex-1 rounded-2xl border border-slate-200 bg-white px-8 py-4 font-bold text-slate-600 transition-all hover:bg-slate-50"
        >
          회원가입
        </Link>
      </div>
    </div>
  )
}

function Info() {
  return (
    <aside className="rounded-3xl border border-blue-100 bg-blue-50/30 p-6">
      <div className="flex gap-3 text-blue-900">
        <LucideInfo className="size-5 shrink-0 translate-y-0.5" />
        <p className="text-sm leading-relaxed">
          로그인에 성공하면 Supabase가 쿠키에 세션을 저장하며,{' '}
          <br className="hidden lg:inline" />
          이후 모든 요청에서 <code>auth.uid()</code>를 통해 사용자를 식별합니다.
        </p>
      </div>
    </aside>
  )
}
