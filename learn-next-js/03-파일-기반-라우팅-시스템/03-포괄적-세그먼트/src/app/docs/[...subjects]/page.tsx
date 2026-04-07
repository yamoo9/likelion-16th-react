import Link from 'next/link'
import { Fragment } from 'react'
import { LucideChevronRight, LucideFileText, LucideHome } from 'lucide-react'

import { cn } from '@/utils'

export default async function FundamentalPage({
  params,
}: PageProps<'/docs/[...subjects]'>) {
  // subjects = URL에 인코딩된 한글 경로를 포함하는 배열
  const { subjects } = await params

  // decodedSubjects = 디코딩한 한글 경로를 포함하는 배열
  const decodedSubjects = subjects.map((subject) => decodeURIComponent(subject))
  // console.log(decodedSubjects)

  // 학습 뎁스(depth)
  const depth = decodedSubjects.length

  // 현재 페이지의 제목
  const lastSubjectTitle = decodedSubjects.at(-1)?.replace(/-/g, ' ')

  return (
    <section className="w-full space-y-12">
      
      {/* 상대 경로 안내 (Breadcrumbs) */}
      <nav
        aria-label="학습 문서 제목 단계"
        className="flex h-10 items-center gap-x-1 mb-10 font-bold text-slate-400"
      >
        {decodedSubjects.map((subject, index) => {
          const isFirst = index === 0
          const isLast = index === depth - 1
          const href = `/docs/${subjects.slice(0, index + 1).join('/')}`

          return (
            <Fragment key={index}>
              {isFirst ? (
                <LucideHome className="size-4" />
              ) : (
                <LucideChevronRight className="size-4 shrink-0 text-slate-400" />
              )}
              <Link
                href={href}
                className={cn(
                  'rounded-full border py-1 transition-all px-4',
                  isLast
                    ? 'border-blue-600 bg-blue-600 text-white shadow-md'
                    : 'border-transparent hover:bg-blue-50 hover:text-blue-500',
                )}
              >
                {subject.replace(/-/g, ' ')}
              </Link>
            </Fragment>
          )
        })}
      </nav>

      {/* 페이지 헤더 */}
      <header className="space-y-5">
        <div className={cn(
          'inline-flex items-center gap-2 rounded-full border border-blue-300 bg-blue-50',
          'px-3 py-1 text-xs font-black tracking-wide text-blue-600'
        )}>
          <LucideFileText className="size-3.5" />
          <span>학습 단계 {depth} / 3</span>
        </div>
        <h1
          className={cn(
            'text-5xl font-black tracking-tighter text-slate-900',
            'md:text-6xl',
          )}
        >
          {lastSubjectTitle}
        </h1>
        <p
          className={cn(
            'max-w-2xl',
            'text-xl leading-relaxed font-medium text-slate-500',
          )}
        >
          {lastSubjectTitle}에 대한 심화 학습을 위해 아래 하위 주제를
          선택하세요.
        </p>
      </header>
    </section>
  )
}
