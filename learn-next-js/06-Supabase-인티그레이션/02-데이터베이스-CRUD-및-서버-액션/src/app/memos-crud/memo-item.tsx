'use client'

import { useState } from 'react'
import {
  LucideStickyNote,
  LucideCalendar,
  LucideTrash2,
  LucideEdit3,
  LucideCheck,
  LucideX,
} from 'lucide-react'

import { cn } from '@/utils'
import { Memo } from '@/actions/memo-actions'

interface Props {
  memo?: Memo
}

export default function MemoItem({ memo }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(memo?.title)
  const [content, setContent] = useState(memo?.content)

  /**
   * updateMemoAction 서버 액션을 정의합니다.
   * 서버 액션을 사용해 수정한 후, 화면을 즉시 업데이트합니다.
   */
  const updateMemo = async () => {
    console.log('메모 수정 기능')
    setIsEditing(false) // 에디트 모드 OFF
  }

  /**
   * deleteMemoAction 서버 액션을 정의합니다.
   * 서버 액션을 사용해 수정한 후, 화면을 즉시 업데이트합니다.
   */
  const deleteMemo = () => {
    console.log('메모 삭제 기능')
  }

  return (
    <article
      className={cn(
        'group relative rounded-3xl border-2 p-6 transition-all',
        isEditing
          ? 'border-slate-900 bg-white shadow-lg'
          : 'border-slate-100 bg-white hover:border-slate-200',
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex w-full gap-4">
          <div
            className={cn(
              'flex size-10 shrink-0 items-center justify-center rounded-xl transition-colors',
              isEditing
                ? 'bg-slate-900 text-white'
                : 'bg-slate-50 text-slate-400 group-hover:bg-slate-900 group-hover:text-white',
            )}
          >
            <LucideStickyNote className="size-5" />
          </div>

          <div className="w-full pr-8">
            {isEditing ? (
              <>
                {/* 수정 모드 ON */}
                <div className="flex flex-col gap-2">
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-3 py-1 font-bold text-slate-900 focus:ring-2 focus:ring-slate-900 focus:outline-none"
                  />
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={3}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 focus:ring-2 focus:ring-slate-900 focus:outline-none"
                  />
                </div>
              </>
            ) : (
              <>
                {/* 수정 모드 OFF */}
                <h3 className="font-bold text-slate-900">{memo?.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{memo?.content}</p>
              </>
            )}

            <div className="mt-3 flex items-center gap-2 text-[10px] font-bold text-slate-400">
              <LucideCalendar className="size-3" />
              {new Date(memo?.created_at ?? '').toLocaleString('ko-KR')}
            </div>
          </div>
        </div>

        <div className="flex shrink-0 flex-col gap-2">
          {isEditing ? (
            <>
              {/* 수정 모드 ON */}
              <button
                type="button"
                aria-label="수정 확인"
                onClick={() => updateMemo()}
                className="cursor-pointer rounded-lg p-2 text-emerald-500 hover:bg-emerald-50"
              >
                <LucideCheck className="size-5" />
              </button>
              <button
                type="button"
                aria-label="수정 취소"
                onClick={() => setIsEditing(false)}
                className="cursor-pointer rounded-lg p-2 text-slate-400 hover:bg-slate-50"
              >
                <LucideX className="size-5" />
              </button>
            </>
          ) : (
            <>
              {/* 수정 모드 OFF */}
              <button
                type="button"
                aria-label="수정 모드 전환"
                onClick={() => setIsEditing(true)}
                className="cursor-pointer rounded-lg p-2 text-slate-300 hover:bg-slate-50 hover:text-slate-600"
              >
                <LucideEdit3 className="size-5" />
              </button>
              <button
                type="button"
                aria-label="삭제"
                onClick={() => deleteMemo()}
                className="cursor-pointer rounded-lg p-2 text-slate-300 hover:bg-rose-50 hover:text-rose-500"
              >
                <LucideTrash2 className="size-5" />
              </button>
            </>
          )}
        </div>
      </div>
    </article>
  )
}
