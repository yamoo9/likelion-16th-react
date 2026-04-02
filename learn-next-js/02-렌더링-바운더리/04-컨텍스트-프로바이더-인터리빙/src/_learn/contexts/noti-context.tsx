'use client'

import {
  FileExclamationPoint,
  LucideCheckCircle2,
  LucideCircleX,
  LucideInfo,
  LucideX,
} from 'lucide-react'
import { createContext, use, useCallback } from 'react'
import { useImmer } from 'use-immer'

// 알림(Noti) 종류
type NotiType = 'success' | 'warn' | 'info' | 'error' | 'help'

// Noti Context 값 인터페이스
interface NotiContextValue {
  noti: (title: string, content?: string, type?: NotiType) => void
}

// React Context 생성
const NotiContext = createContext<undefined | NotiContextValue>(undefined)

// 알림 아이템 (NotiItem) 인터페이스
interface NotiItem {
  id: number
  title: string
  content?: string
  type: NotiType
}

// React Context Provider 래퍼 컴포넌트 작성 (Context Value 공급)
export function NotiProvider({ children }: React.PropsWithChildren) {
  // 멀티 노티 수집해서 관리할 배열 상태 선언
  const [notiContainer, setNotiContainer] = useImmer<NotiItem[]>([])

  // 알림 처리 함수
  const noti: NotiContextValue['noti'] = useCallback(
    (title, content = '', type = 'info') => {
      // 노티 (알림) 객체 : { id, title, content, type }
      const newNoti = {
        id: Date.now(),
        title,
        content,
        type,
      }

      // 노티 관리자(배열)의 마지막에 새 노티 추가
      setNotiContainer((draft) => {
        // 프록시 객체: 뮤테이션 허용
        draft.push(newNoti)
      })

      // 3초 뒤에 노티 ID를 통해 노티 관리자에서 제거
      setTimeout(() => {
        setNotiContainer((draft) => {
          const removeIndex = draft.findIndex((noti) => noti.id === newNoti.id)
          draft.splice(removeIndex, 1)
        })
      }, 6000)
    },
    [setNotiContainer],
  )

  const notiConextValue = { noti } as NotiContextValue

  return (
    <NotiContext value={notiConextValue}>
      {children}

      <div
        aria-live="assertive"
        className="fixed right-0 bottom-0 z-100 flex w-full max-w-105 flex-col gap-2 p-5"
      >
        {notiContainer.map((noti) => (
          <div
            role="status"
            key={noti.id}
            className="relative rounded-3xl border border-slate-300 p-5"
          >
            <h4 className="flex items-center gap-1">
              <NotiIcon type={noti.type} />
              {noti.title}
            </h4>
            {noti.content && <p>{noti.content}</p>}

            <button
              type="button"
              aria-label="삭제"
              className="absolute top-3 right-3"
              onClick={() => {
                setNotiContainer((draft) => {
                  const removeIndex = draft.findIndex((n) => n.id === noti.id)
                  draft.splice(removeIndex, 1)
                })
              }}
            >
              <LucideX />
            </button>
          </div>
        ))}
      </div>
    </NotiContext>
  )
}

function NotiIcon({ type }: { type: NotiType }) {
  switch (type) {
    case 'info':
      return <LucideInfo />
    case 'success':
      return <LucideCheckCircle2 />
    case 'error':
      return <LucideCircleX />
    case 'warn':
      return <FileExclamationPoint />
    default:
      return null
  }
}

// Context Value 반환 커스텀 훅
export function useNoti() {
  const notiContextValue = use(NotiContext)
  if (!notiContextValue)
    throw new Error('useNoti 훅은 NotiProvider 내부에서만 사용 가능합니다.')
  return notiContextValue
}
