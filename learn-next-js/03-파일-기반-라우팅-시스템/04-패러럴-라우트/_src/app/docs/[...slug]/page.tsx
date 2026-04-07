import { Fragment } from 'react'
import Link from 'next/link'
import {
  ChevronRight,
  Home,
  FileText,
  ArrowRight,
  Layers,
  Zap,
} from 'lucide-react'

import { cn } from '@/utils'

interface PageProps {
  params: Promise<{ slug: string[] }>
}

const getNextStep = (depth: number) => {
  if (depth === 1) {
    return [
      {
        title: '라우팅 기초',
        path: '라우팅-기초',
        icon: Layers,
        desc: 'Next.js App Router의 핵심 개념을 파헤칩니다.',
      },
      {
        title: '렌더링 원리',
        path: '렌더링-원리',
        icon: Zap,
        desc: '서버와 클라이언트 컴포넌트의 차이를 이해합니다.',
      },
    ]
  }
  if (depth === 2) {
    return [
      {
        title: '동적 라우팅',
        path: '동적-라우팅',
        icon: Layers,
        desc: 'URL 파라미터를 활용한 유연한 페이지 생성 기법',
      },
      {
        title: '중첩 레이아웃',
        path: '중첩-레이아웃',
        icon: Layers,
        desc: '상위 구조를 유지하며 콘텐츠만 교체하는 방법',
      },
    ]
  }
  return []
}

export default async function DocsPage({ params }: PageProps) {
  const { slug } = await params
  const decodedSlug = slug.map((s) => decodeURIComponent(s))
  const lastTitle = decodedSlug.at(-1)
  const depth = decodedSlug.length
  const nextSteps = getNextStep(depth)

  return (
    <div className="w-full space-y-12">
      {/* 상단 경로 안내 (Breadcrumb) */}
      <nav className="flex h-10 items-center gap-x-1 text-sm font-bold text-slate-400">
        <Link
          href="/docs/기초"
          className="flex shrink-0 items-center gap-1.5 transition-colors hover:text-blue-600"
        >
          <Home className="h-4 w-4" />
          <span>Docs</span>
        </Link>

        {decodedSlug.map((segment, index) => {
          const isLast = index === decodedSlug.length - 1
          const href = `/docs/${slug.slice(0, index + 1).join('/')}`
          return (
            <Fragment key={index}>
              <ChevronRight className="h-3.5 w-3.5 shrink-0 text-slate-300" />
              <Link
                href={href}
                className={cn(
                  'rounded-full border px-3 py-1 transition-all',
                  isLast
                    ? 'border-blue-600 bg-blue-600 text-white shadow-md'
                    : 'border-transparent hover:bg-blue-50 hover:text-blue-600',
                )}
              >
                {segment}
              </Link>
            </Fragment>
          )
        })}
      </nav>

      {/* 페이지 헤더 */}
      <header className="space-y-5">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-black tracking-widest text-blue-600 uppercase">
          <FileText className="h-3.5 w-3.5" />
          <span>Step {depth} / 3</span>
        </div>
        <h1 className="text-5xl font-black tracking-tighter text-slate-900 md:text-6xl">
          {lastTitle}
        </h1>
        <p className="max-w-2xl text-xl leading-relaxed font-medium text-slate-500">
          "{lastTitle}"에 대한 심화 학습을 위해 아래 하위 주제를 선택하세요.
        </p>
      </header>

      {/* 하위 단계 카드 리스트 */}
      <section className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {nextSteps.map((item) => (
          <Link
            key={item.path}
            href={`/docs/${slug.join('/')}/${item.path}`}
            className={cn(
              'group relative overflow-hidden p-10',
              'rounded-[2.5rem] border border-slate-100 bg-white shadow-2xl shadow-slate-200/40',
              'transition-all duration-500 hover:-translate-y-2 hover:border-blue-500',
            )}
          >
            <div className="absolute -top-4 -right-4 h-32 w-32 rounded-full bg-blue-50 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

            <div className="relative z-10 space-y-6">
              <div className="inline-flex rounded-3xl bg-slate-50 p-4 text-slate-400 transition-all duration-500 group-hover:bg-blue-600 group-hover:text-white">
                <item.icon className="h-7 w-7" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black tracking-tight text-slate-900">
                  {item.title}
                </h3>
                <p className="leading-relaxed font-medium text-slate-400">
                  {item.desc}
                </p>
              </div>
              <div className="flex items-center gap-2 pt-2 text-sm font-black text-blue-600">
                <span>다음 단계 학습</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
              </div>
            </div>
          </Link>
        ))}
      </section>
    </div>
  )
}
