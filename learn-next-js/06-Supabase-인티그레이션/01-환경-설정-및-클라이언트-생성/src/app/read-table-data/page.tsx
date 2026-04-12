import {
  LucideDatabase,
  LucideAlertCircle,
  LucideChevronRight,
  LucideCalendar,
  LucideStickyNote,
  LucideArrowLeft,
  LucideHash,
  LucideCircleSmall,
} from 'lucide-react'
import Link from 'next/link'

import { cn } from '@/utils'

interface Memo {
  id: string | number
  title: string
  content: string
  created_at: Date | string
}

export default async function ReadTableDataPage() {
 
  // Supabase 데이터베이스 memos 테이블에서 데이터 조회
  const supabase = null
  const data = [] as Memo[]
  const error = null as unknown as Error

  return (
    <section
      className={cn(
        'mx-auto w-80/100 max-w-3xl px-6 py-12 antialiased',
        'flex flex-col',
      )}
    >
      <header className="mb-10">
        <Link
          href="/setup-check"
          className={cn(
            'group mb-6 inline-flex items-center transition-colors',
            'text-sm font-semibold text-slate-500 hover:text-slate-900',
          )}
        >
          <LucideArrowLeft className="mr-2 size-4 transition-transform group-hover:-translate-x-1" />
          설정 확인으로 돌아가기
        </Link>

        <div className="flex items-center gap-4">
          <div
            className={cn(
              'inline-flex size-14 items-center justify-center rounded-2xl shadow-sm',
              'border border-slate-100 bg-slate-50',
            )}
          >
            <LucideDatabase className="size-7 text-slate-700" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              메모 데이터베이스
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Supabase{' '}
              <code
                lang="en"
                className={cn(
                  'rounded px-1.5 py-0.5 font-mono text-xs',
                  'bg-slate-100 text-slate-700',
                )}
              >
                memos
              </code>{' '}
              테이블의 최신 레코드를 확인합니다.
            </p>
          </div>
        </div>
      </header>

      {/* 요약 정보 */}
      <aside
        className={cn(
          'mb-4 flex items-center justify-between px-2 text-xs font-bold tracking-widest uppercase',
          'text-slate-400',
        )}
      >
        <span className="flex items-center gap-2">
          <LucideHash className="size-3" />
          메모 총 개수: {data.length}
        </span>
        <span className="flex items-center gap-2">
          상태:{' '}
          <LucideCircleSmall
            className={cn(
              'stoke-slate-300 fill-slate-200 size-5 rounded-full',
              supabase && 'stroke-emerald-500 fill-emerald-300',
            )}
          />
        </span>
      </aside>

      {error ? (
        /* 에러 카드 */
        <article
          className={cn(
            'relative overflow-hidden rounded-4xl border-2 p-8 shadow-sm transition-all',
            'border-rose-600 bg-white',
          )}
        >
          <div
            className={cn(
              'mb-6 inline-flex size-12 items-center justify-center rounded-2xl',
              'bg-rose-50',
            )}
          >
            <LucideAlertCircle className="size-6 text-rose-600" />
          </div>
          <h3 className="mb-2 text-lg font-bold text-rose-700">
            데이터 로드 실패
          </h3>
          <div
            className={cn(
              'rounded-2xl border p-4 font-mono text-xs leading-relaxed break-all',
              'border-rose-100 bg-rose-50 text-rose-600',
            )}
          >
            <p className="mb-1 font-bold">[Error Message]</p>
            <p>{error.message}</p>
          </div>
        </article>
      ) : (
        /* 데이터 리스트 */
        <div className="space-y-4">
          {data && data.length > 0 ? (
            data?.map((item) => (
              <article
                key={item.id}
                className={cn(
                  'group relative overflow-hidden rounded-3xl border-2 p-6 shadow-sm transition-all',
                  'border-slate-100 bg-white',
                  'hover:border-slate-300 hover:shadow-md',
                )}
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          'flex size-9 items-center justify-center rounded-lg transition-colors',
                          'bg-slate-50 text-slate-400',
                          'group-hover:bg-slate-900 group-hover:text-white',
                        )}
                      >
                        <LucideStickyNote className="size-5" />
                      </div>
                      <h4 className="line-clamp-1 text-lg font-bold text-slate-900">
                        {item.title ?? '제목 없는 메모'}
                      </h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-bold text-slate-300 uppercase">
                        ID: {item.id}
                      </span>
                      <LucideChevronRight
                        className={cn(
                          'size-5 text-slate-200 transition-transform',
                          'group-hover:translate-x-1 group-hover:text-slate-900',
                        )}
                      />
                    </div>
                  </div>

                  <p className="line-clamp-2 text-sm leading-relaxed text-slate-600">
                    {item.content || '내용이 없습니다.'}
                  </p>

                  <div className="mt-2 flex items-center gap-4 border-t border-slate-50 pt-4">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                      <LucideCalendar className="size-3.5" />
                      {new Date(item.created_at).toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>
                </div>
              </article>
            ))
          ) : (
            /* 데이터 없음 */
            <div
              className={cn(
                'rounded-4xl border-2 border-dashed py-20 text-center',
                'border-slate-200',
              )}
            >
              <p className="text-sm font-medium text-slate-400">
                조회된 메모가 없습니다.
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
