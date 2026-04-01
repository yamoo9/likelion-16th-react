'use client'

import { useEffect, useState, useTransition } from 'react'
import { readLikes, writeLikes } from '@/functions/likes-read-write' // 서버 함수
import { cn, isErrorObject } from '@/utils'


export default function ReudcingJSBundleSize() {
  const [likes, setLikes] = useState(0)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    startTransition(async () => {
      const currentLikes = await readLikes()
      setLikes(currentLikes)
    })
  }, [])

  const renderedTime = new Date().toISOString()
  console.log('렌더 타임', renderedTime)

  const handleLike = () => {
    if (isPending) return

    startTransition(async () => {
      try {
        const nextCount = likes + 1
        const result = await writeLikes(nextCount)
        if (result.success) setLikes(nextCount)
      } catch (error) {
        if (isErrorObject(error)) console.error(error)
        else console.error('[에러 발생]', String(error))
      }
    })
  }

  return (
    <div
      className={cn(
        'bg-background flex min-h-screen',
        'flex-col items-center justify-center gap-5'
      )}
    >
      <header>
        <h1
          className={cn('text-foreground text-center text-4xl font-extralight')}
        >
          데이터 전달
          <br />
          <span
            lang="en"
            className="inline-block -translate-y-2.5 text-xl text-slate-500"
          >
            Passing Data
          </span>
        </h1>
      </header>

      <main>
        <section className="flex flex-col items-center justify-center p-24">
          <div className="rounded-2xl border border-gray-100 bg-white p-10 shadow-xl">
            <h2 className="mb-4 text-2xl font-bold text-rose-600">
              Next.js 데이터 전달
            </h2>
            <p className="mb-8 text-sm text-gray-600">
              아래 버튼을 누르면 서버의
              <code className="mx-0.5 rounded bg-gray-100 px-1.5 py-0.5 text-rose-600">
                likes.json
              </code>
              파일이 업데이트됩니다.
            </p>

            <button
              type="button"
              aria-disabled={isPending}
              onClick={handleLike}
              className={cn(
                'flex cursor-pointer items-center gap-2 rounded-full border border-rose-200 bg-rose-50',
                'px-6 py-2 text-rose-600 transition-all hover:bg-rose-100 active:scale-97',
                isPending && 'cursor-not-allowed opacity-60 grayscale-100 active:scale-100',
              )}
            >
              <span>{isPending ? '⏳' : '❤️'}</span>
              <span className="font-bold">좋아요 {likes}</span>
            </button>
            <p className="mt-6 font-mono text-xs text-gray-400">
              데이터 = {likes}
            </p>
            <p className="mt-6 font-mono text-xs text-gray-400">
              렌더링 타임 = <time dateTime={renderedTime}>{renderedTime}</time>
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}
