import { createContext, use, useCallback, useState } from 'react'
import { X, CheckCircle2, AlertCircle, Info } from 'lucide-react'
import { cn } from '@/utils'

/** 알림의 성격에 따른 타입 정의 */
type ToastType = 'success' | 'error' | 'info'

/** 개별 토스트 객체의 구조 */
interface Toast {
  id: number
  title: string
  description?: string
  type: ToastType
}

/** Context를 통해 외부로 노출될 함수 타입 */
interface ToastContextType {
  /**
   * @param title - 알림의 제목
   * @param description - (선택) 상세 설명
   * @param type - (선택) 알림 종류: 'success' | 'error' | 'info' (기본값: 'info')
   */
  toast: (title: string, description?: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

/**
 * @component ToastProvider
 * @description 애플리케이션 최상단(layout.tsx)에서 사용하며, 토스트 알림의 상태와 UI를 관리합니다.
 * 
 * @example
 * // layout.tsx 에서 적용
 * 
 * export default function RootLayout({ children }: React.PropsWithChildren) {
 *   return (
 *     <html lang="ko-KR">
 *       <body>
 *         <ToastProvider>
 *           {children}
 *         </ToastProvider>
 *       </body>
 *     </html>
 *   )
 * }
 */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  /** 새로운 토스트를 생성하고 3초 후 자동으로 제거하는 함수 */
  const toast = useCallback(
    (title: string, description?: string, type: ToastType = 'info') => {
      const id = Date.now()
      setToasts((prev) => [...prev, { id, title, description, type }])

      // 3000ms(3초) 후 해당 ID의 토스트를 목록에서 제거
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      }, 3000)
    },
    [],
  )

  return (
    <ToastContext value={{ toast }}>
      {/* 하위 서버/클라이언트 컴포넌트 렌더링 */}
      {children}

      {/* 토스트 알림이 표시되는 포털 영역 */}
      <div
        className={cn(
          'fixed right-0 bottom-0 z-100 w-full max-w-105 p-6',
          'pointer-events-none flex flex-col gap-3',
        )}
        aria-live="assertive"
        aria-relevant="additions"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className={cn(
              'pointer-events-auto relative flex w-full items-start gap-4 overflow-hidden rounded-xl border p-4 pr-8 shadow-lg',
              'animate-in slide-in-from-right-full fade-in duration-300 ease-out',
              // 타입별 스타일 대응
              t.type === 'success' &&
                'border-emerald-100 bg-white text-emerald-900 dark:bg-emerald-950 dark:text-emerald-50',
              t.type === 'error' &&
                'border-red-100 bg-white text-red-900 dark:bg-red-950 dark:text-red-50',
              t.type === 'info' &&
                'border-slate-200 bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-50',
            )}
          >
            <ToastIcon type={t.type} />

            <div className="grid gap-1">
              <h4 className="text-sm leading-none font-bold tracking-tight">
                {t.title}
              </h4>
              {t.description && (
                <p className="text-xs leading-relaxed opacity-80">
                  {t.description}
                </p>
              )}
            </div>

            {/* 닫기 버튼 */}
            <button
              type="button"
              onClick={() =>
                setToasts((prev) => prev.filter((toast) => toast.id !== t.id))
              }
              className={cn(
                'absolute top-2 right-2 rounded-md p-1 opacity-50 transition-opacity',
                'hover:opacity-100 focus:ring-2 focus:ring-slate-400 focus:outline-none',
              )}
              aria-label="알림 닫기"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext>
  )
}

/** 타입에 맞는 아이콘을 리턴하는 내부 컴포넌트 */
function ToastIcon({ type }: { type: ToastType }) {
  switch (type) {
    case 'success':
      return <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" aria-hidden="true" />
    case 'error':
      return <AlertCircle className="h-5 w-5 shrink-0 text-red-500" aria-hidden="true" />
    default:
      return <Info className="h-5 w-5 shrink-0 text-blue-500" aria-hidden="true" />
  }
}

/**
 * useToast 훅
 * 
 * 컴포넌트 내부에서 토스트를 호출하기 위한 커스텀 훅입니다.
 * 
 * @example
 * 'use client'
 * 
 * import { useToast } from '@/contexts/toast-context'
 * 
 * export function OrderButton() {
 *   const { toast } = useToast()
 * 
 *   const handleClick = () => {
 *     toast('주문 완료', '성공적으로 주문되었습니다.', 'success')
 *   }
 * 
 *   return <button type="button" onClick={handleClick}>주문하기</button>
 * }
 */
export const useToast = () => {
  const context = use(ToastContext)
  if (!context) throw new Error('useToast 훅은 ToastProvider 내부에서만 사용 가능합니다.')
  return context
}