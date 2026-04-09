'use client'

import { useState, useEffect } from 'react'
import {
  LucideCalendar,
  LucideCheck,
  LucideEdit3,
  LucideStickyNote,
  LucideTrash2,
  LucideX,
} from 'lucide-react'

import {
  deleteMemoAction,
  updateMemoAction,
  type Memo,
} from '@/actions/memo-actions'
import { cn } from '@/utils'

export default function MemoItem({ memo }: { memo: Memo }) {
  
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(memo.title)
  const [content, setContent] = useState(memo.content)
  
  
  // 클라이언트용 Supabase 클라이언트를 생성합니다.
  // ...

  // 현재 사용자 ID를 관리할 상태를 선언합니다.
  const currentUserId = -1

  // 현재 로그인한 사용자 정보 가져오기
  useEffect(() => {
    
    const fetchUser = async () => {
      // 현재 인증된 사용자 정보를 가져옵니다.
      const user = null

      if (user) {
        // 로그인된 상태라면 사용자 ID를 현재 사용자 ID로 설정합니다.
        // ...
      }
    }

    fetchUser()
  }, [])

  // 로그인한 사용자 본인인지 여부를 확인합니다.
  // (메모의 user_id와 현재 로그인 사용자의 id 비교)
  const isOwner = currentUserId === -1

  const handleUpdate = async () => {
    await updateMemoAction(memo.id, title, content)
    setIsEditing(false)
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
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm whitespace-pre-wrap text-slate-600 focus:ring-2 focus:ring-slate-900 focus:outline-none"
                />
              </div>
            ) : (
              <>
                <h3 className="font-bold text-slate-900">{memo.title}</h3>
                <p className="mt-1 text-sm whitespace-pre-wrap text-slate-600">
                  {memo.content}
                </p>
              </>
            )}

            <div className="mt-3 flex items-center gap-2 text-[10px] font-bold text-slate-400">
              <LucideCalendar className="size-3" />
              <time dateTime={memo.created_at}>
                {new Date(memo.created_at).toLocaleString('ko-KR')}
              </time>
            </div>
          </div>
        </div>

        {/* 본인(Owner)일 때만 액션 버튼 렌더링 */}
        {isOwner && (
          <div className="flex shrink-0 flex-col gap-2">
            {isEditing ? (
              <>
                <button
                  type="button"
                  aria-label="수정 확인"
                  onClick={handleUpdate}
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
                  onClick={() => deleteMemoAction(memo.id)}
                  className="cursor-pointer rounded-lg p-2 text-slate-300 hover:bg-rose-50 hover:text-rose-500"
                >
                  <LucideTrash2 className="size-5" />
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </article>
  )
}
