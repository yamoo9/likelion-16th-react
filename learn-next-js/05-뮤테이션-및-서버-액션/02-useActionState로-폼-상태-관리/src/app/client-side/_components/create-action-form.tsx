'use client'

import { useActionState, useImperativeHandle } from "react"
import { LucideAlertCircle } from "lucide-react"

import { createItemAction } from "@/actions/create-item-action"
import { useInput } from "@/hooks"
import { cn } from "@/utils"

import { CreateItemButton } from "./create-item-button"
import { SuccessScreen } from "./success-screen"
import { FormInfo } from "./form-info"

// 초기 폼 상태
const INITIAL_FORM_STATE = {
  success: false,
  message: '',
  error: '',
}

interface CreateActionFormProps {
  ref: React.RefObject<{ focus: () => void }>
  onReset: () => void
}

export function CreateActionForm({ ref, onReset }: CreateActionFormProps) {

  // useActionState 훅이 일괄적으로 관리할 상태 (서버에서 보내주는 데이터)
  const [state, dispatchAction, isPending] = useActionState(
    createItemAction, // 서버 액션 (리듀서 액션 함수)
    INITIAL_FORM_STATE, // 폼 초기 상태
    '/client-side'// 퍼머링크 (Next.js 서버에서 실행되는 프로그램 URL)
  )

  const itemInput = useInput('')
  const isNotInput = itemInput.props.value.trim().length === 0

  // 현재(자식) 컴포넌트 내부의 명령형 핸들을 상위(부모) 컴포넌트에 노출하는 방법
  useImperativeHandle(ref, () => {
    
    // 명령형 핸들을 포함한 객체
    return {
      focus: () => {
        itemInput.methods.focus()
      }
    }
  })

  return (
    <div
      className={cn(
        'relative flex flex-col justify-between overflow-hidden',
        'mx-auto min-h-87.5 w-full max-w-md p-10',
        'rounded-[40px] border border-slate-100 bg-white',
        'shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all hover:shadow-xl',
      )}
    >
      <div className="relative z-10">
        <FormInfo state={state} />

        {!state.message ? (
          <form
            action={dispatchAction} // POST 요청 (Next.js 서버)
            className="relative z-10 space-y-4"
            noValidate
          >
            <div className="space-y-2">
              <input
                name="title"
                required
                aria-disabled={isPending}
                aria-invalid={!!state.error}
                {...itemInput.props}
                placeholder="아이템 이름 입력..."
                className={cn(
                  'w-full rounded-2xl border bg-slate-50/50 p-4 transition-all outline-none',
                  'placeholder:text-slate-400',
                  state.error
                    ? 'border-red-200 bg-red-50/30 focus:ring-2 focus:ring-red-500/20'
                    : 'border-slate-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20',
                  'aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
                )}
              />

              {/* 에러 메시지 UI */}
              {state.error && (
                <div className="animate-in fade-in slide-in-from-top-1 flex items-center gap-1.5 px-1 text-red-500">
                  <LucideAlertCircle className="h-4 w-4" />
                  <p role="alert" className="text-[13px] font-medium">
                    {state.error}
                  </p>
                </div>
              )}
            </div>

            <CreateItemButton isPending={isPending} isNotInput={isNotInput} />
          </form>
        ) : (
          /* 성공 메시지 UI */
          <SuccessScreen state={state} onReset={onReset} />
        )}
      </div>
    </div>
  )
}