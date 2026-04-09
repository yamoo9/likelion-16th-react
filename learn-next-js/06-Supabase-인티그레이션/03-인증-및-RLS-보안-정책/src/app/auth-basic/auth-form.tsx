'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import {
  LucideMail,
  LucideLock,
  LucideAlertCircle,
  LucideArrowRight,
} from 'lucide-react'

import { signInAction, signUpAction } from '@/actions/auth-actions'
import { cn } from '@/utils'
import { useFormStatus } from 'react-dom'


interface AuthFormProps {
  mode: 'signin' | 'signup'
}

export function AuthForm({ mode }: AuthFormProps) {
  const isSignIn = mode === 'signin'

  // 모드 별, 서버 액션 분기
  const [state, dispatchAction] = useActionState(
    isSignIn ? signInAction : signUpAction,
    null,
  )

  return (
    <article className="rounded-[40px] border-2 border-slate-100 bg-white p-10 shadow-sm">
      <Header isSignIn={isSignIn} />

      <form action={dispatchAction} className="space-y-5">
        {/* 이메일 입력 */}
        <EmailInput state={state} />

        {/* 비밀번호 입력 */}
        <PasswordInput isSignIn={isSignIn} state={state} />

        {/* 결과 메시지 (성공/실패) */}
        <ResultMessage state={state} />

        {/* 제출 버튼 */}
        <SubmitButton isSignIn={isSignIn} />

        {/* 모드 전환 링크 */}
        <ChangeModeLink isSignIn={isSignIn} />
      </form>
    </article>
  )
}

type State = {
  success: boolean
  message?: string | undefined
  errors?:
    | {
        email?: string[] | undefined
        password?: string[] | undefined
      }
    | undefined
} | null

function Header({ isSignIn }: { isSignIn: boolean }) {
  return (
    <header className="mb-8 text-center sm:text-left">
      <h2 className="text-2xl font-bold text-slate-900">
        {isSignIn ? '로그인' : '가입'}
      </h2>
      <p className="mt-2 text-sm text-slate-500">
        {isSignIn
          ? '등록된 계정으로 서비스를 이용하세요.'
          : '새로운 계정을 생성하고 시작해보세요.'}
      </p>
    </header>
  )
}

function EmailInput({ state }: { state: State }) {
  return (
    <div className="space-y-2">
      <label
        htmlFor="email"
        className="ml-1 block text-xs font-black tracking-wider text-slate-400 uppercase"
      >
        이메일
      </label>
      <div className="relative">
        <LucideMail className="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-slate-400" />
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className={cn(
            'w-full rounded-2xl border py-4 pr-4 pl-12 text-sm font-medium transition-all outline-none',
            'bg-slate-50/50 focus:bg-white focus:ring-4',
            state?.errors?.email
              ? 'border-rose-300 focus:ring-rose-50'
              : 'border-slate-200 focus:ring-slate-50',
          )}
          placeholder="example@email.com"
        />
      </div>
      <ErrorInfo errorType={state?.errors?.email} />
    </div>
  )
}

function PasswordInput({
  state,
  isSignIn,
}: {
  state: State
  isSignIn: boolean
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor="password"
        className="ml-1 block text-xs font-black tracking-wider text-slate-400 uppercase"
      >
        패스워드
      </label>
      <div className="relative">
        <LucideLock className="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-slate-400" />
        <input
          id="password"
          name="password"
          type="password"
          autoComplete={isSignIn ? 'current-password' : 'new-password'}
          required
          className={cn(
            'w-full rounded-2xl border py-4 pr-4 pl-12 text-sm font-medium transition-all outline-none',
            'bg-slate-50/50 focus:bg-white focus:ring-4',
            state?.errors?.password
              ? 'border-rose-300 focus:ring-rose-50'
              : 'border-slate-200 focus:ring-slate-50',
          )}
          placeholder="••••••••"
        />
      </div>
      <ErrorInfo errorType={state?.errors?.password} />
    </div>
  )
}

function ErrorInfo({ errorType }: { errorType?: string[] }) {
  if (!errorType) return null

  return (
    <p className="ml-1 flex items-center gap-1 text-xs font-bold text-rose-500">
      <LucideAlertCircle className="size-3" /> {errorType[0]}
    </p>
  )
}

function ResultMessage({ state }: { state: State }) {
  if (!state?.message) return null

  return (
    <div
      className={cn(
        'animate-in fade-in slide-in-from-top-1 rounded-xl border px-4 py-3 text-sm font-bold',
        state.success
          ? 'border-emerald-100 bg-emerald-50 text-emerald-600'
          : 'border-rose-100 bg-rose-50 text-rose-600',
      )}
    >
      {state.message}
    </div>
  )
}

function SubmitButton({ isSignIn }: { isSignIn: boolean }) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      aria-disabled={pending}
      className={cn(
        'cursor-pointer',
        'w-full rounded-2xl py-4 font-bold text-white shadow-lg',
        'transition-all active:scale-[0.98] disabled:opacity-50',
        isSignIn
          ? 'bg-slate-500 shadow-slate-100 hover:bg-slate-600'
          : 'bg-slate-900 shadow-slate-100 hover:bg-slate-800',
      )}
    >
      {pending ? '처리 중...' : isSignIn ? '로그인' : '가입'}
    </button>
  )
}

function ChangeModeLink({ isSignIn }: { isSignIn: boolean }) {
  return (
    <div className="pt-2 text-center">
      <Link
        href={isSignIn ? '/auth-basic/signup' : '/auth-basic/signin'}
        className="group inline-flex items-center gap-1 text-sm font-bold text-slate-400 transition-colors hover:text-slate-600"
      >
        {isSignIn
          ? '계정이 없으신가요? 회원가입'
          : '이미 계정이 있으신가요? 로그인'}
        <LucideArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  )
}
