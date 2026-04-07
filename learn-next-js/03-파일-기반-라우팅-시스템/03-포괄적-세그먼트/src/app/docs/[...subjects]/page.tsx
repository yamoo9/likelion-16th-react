import Link from 'next/link'
import { LucideChevronRight, LucideHome } from 'lucide-react'
import { cn } from '@/utils'
import { Fragment } from 'react/jsx-runtime'

export default async function FundamentalPage({
  params,
}: PageProps<'/docs/[...subjects]'>) {
  // subjects = URL에 인코딩된 한글 경로를 포함하는 배열
  const { subjects } = await params

  // decodedSubjects = 디코딩한 한글 경로를 포함하는 배열
  const decodedSubjects = subjects.map((subject) => decodeURIComponent(subject))
  // console.log(decodedSubjects)

  // 현재 페이지의 제목
  const lastSubjectTitle = decodedSubjects.at(-1)?.replace(/-/g, ' ')

  return (
    <section className="w-full space-y-12">
      {/* 상대 경로 안내 (Breadcrumbs) */}
      <nav className="flex h-10 items-center gap-x-1 font-bold text-slate-400">
        <Link
          href={`/docs/${encodeURIComponent('기초')}`}
          className={cn(
            'flex shrink-0 items-center gap-x-1.5',
            'transition-colors hover:text-blue-600',
          )}
        >
          <LucideHome className="size-4" /> 학습 문서 홈
        </Link>
        {decodedSubjects.map((subject, index) => {

          const href = `/docs/${subjects.slice(0, index + 1).join('/')}`

          return (
            <Fragment key={index}>
              <LucideChevronRight className="size-4 shrink-0 text-slate-400" />
              <Link href={href}>{subject.replace(/-/g, ' ')}</Link>
            </Fragment>
          )
        })}
      </nav>

      <h1 className="text-4xl font-black">{lastSubjectTitle}</h1>
    </section>
  )
}
