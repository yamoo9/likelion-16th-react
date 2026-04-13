import { LucideAlertCircle, CheckCircle2 } from 'lucide-react'

import type { FormState } from '@/actions/post-actions'
import { cn } from '@/utils'

export function ValidateStatus({ state }: { state?: FormState }) {
  
  /**
   * [에러 상태 렌더링]
   * 검증에 실패하고(success: false) 가공된 에러 메시지(errors)가 있을 때 표시합니다.
   */
  if (!state?.success && state?.errors) {
    return (
      <div
        role="alert"
        className="group animate-in fade-in slide-in-from-top-2 duration-300"
      >
        <div className="rounded-2xl border border-red-100 bg-red-50/50 p-4">
          {/* 에러 헤더: 아이콘과 요약 메시지 */}
          <div className="mb-2 flex items-center gap-2 text-red-600">
            <LucideAlertCircle size={18} />
            <p className="text-sm font-bold">{state.message}</p>
          </div>
          
          <pre
            className={cn(
              'rounded-xl border border-red-100/50 bg-white/50 p-3',
              'text-sm leading-relaxed whitespace-pre-wrap text-red-500',
            )}
          >
            {state.errors}
          </pre>
        </div>
      </div>
    )
  }

  /**
   * [성공 상태 렌더링]
   * 모든 검증을 통과하고 작업이 성공했을 때 표시합니다.
   */
  if (state?.success) {
    return (
      <div
        role="status"
        className={cn(
          'flex items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 p-4',
          'animate-in zoom-in-95 text-sm font-bold text-emerald-600 duration-300',
        )}
      >
        <CheckCircle2 size={20} />
        {state.message}
      </div>
    )
  }

  // 초기 상태이거나 메시지가 없을 경우 
  // 아무것도 렌더링하지 않음
  return null
}
