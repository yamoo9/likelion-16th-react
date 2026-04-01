'use client'

import { useEffect, useId } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

import { useFocusTrap, useIsMounted } from '@/hooks'
import { cn } from '@/utils'

interface ModalProps {
  /** 모달의 표시 여부 */
  isOpen: boolean
  /** 모달을 닫을 때 호출되는 함수 */
  onClose: () => void
  /** 모달 상단에 표시될 제목 (선택 사항) */
  title?: string
  /** 제목 아래에 표시될 상세 설명 (선택 사항) */
  description?: string
  /** 모달 내부에 렌더링할 콘텐츠 */
  children: React.ReactNode
  /** 모달 컨테이너에 추가할 커스텀 클래스 */
  className?: string
}

/**
 * Next.js 환경에서 사용 가능한 접근성(A11y)이 고려된 포털 모달 컴포넌트입니다.
 *
 * @features
 * - `createPortal`을 사용하여 DOM 계층 구조와 상관없이 최상위(`body`)에 렌더링됩니다.
 * - `useId`를 사용하여 스크린 리더를 위한 제목 및 설명 연결을 지원합니다.
 * - `Esc` 키 입력 시 자동으로 닫히며, 모달이 열릴 때 배경 스크롤을 방지합니다.
 * - 하이드레이션 오류를 방지하기 위해 클라이언트 마운트 여부를 확인합니다.
 *
 * @example
 * ```tsx
 * <Modal
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="프로필 수정"
 *   description="변경 사항을 저장하려면 완료 버튼을 누르세요."
 * >
 *   <form>...</form>
 * </Modal>
 * ```
 */
export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  className,
}: ModalProps) {
  // 접근성을 위한 고유 ID 생성 (제목과 설명을 스크린 리더가 인식하도록 연결)
  const titleId = useId()
  const descriptionId = useId()
  const modalRef = useFocusTrap<HTMLDivElement>(isOpen)

  useEffect(() => {
    // 모달이 닫혀있으면 이벤트 리스너를 등록하지 않음
    if (!isOpen) return

    /** Esc 키 입력 시 모달 닫기 핸들러 */
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    const { body } = document

    // 배경 스크롤 방지 및 키보드 이벤트 등록
    body.style.overflow = 'hidden'
    globalThis.addEventListener('keydown', handleEsc)

    return () => {
      // 클린업: 모달이 닫힐 때 원래 상태로 복구
      body.style.overflow = 'unset'
      globalThis.removeEventListener('keydown', handleEsc)
    }
  }, [isOpen, onClose])

  // SSR 하이드레이션 오류 방지를 위한 마운트 상태 확인
  const isMounted = useIsMounted()

  // 서버 사이드 렌더링 중이거나 모달이 닫힌 상태라면 아무것도 렌더링하지 않음
  if (!isMounted || !isOpen) return null

  // document.body로 콘텐츠를 보냄 (Z-index 및 부모 스타일 영향 최소화)
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 배경(Backdrop): 클릭 시 모달 닫힘 */}
      <div
        onClick={onClose}
        className={cn(
          'fixed inset-0',
          'bg-black/80',
          'backdrop-blur-sm',
          'transition-opacity duration-300',
        )}
      />

      {/* 모달 콘텐츠 영역 */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descriptionId : undefined}
        className={cn(
          'relative z-50 grid w-full max-w-lg gap-4 scale-85 md:scale-100',
          'bg-background border p-6 shadow-lg sm:rounded-lg',
          'animate-in fade-in-0 zoom-in-95 duration-200',
          className,
        )}
      >
        {/* 헤더 섹션: 제목 및 설명 */}
        <div className="flex flex-col space-y-1.5 text-center sm:text-left">
          {title && (
            <h2
              id={titleId}
              className="text-lg leading-none font-semibold tracking-tight"
            >
              {title}
            </h2>
          )}
          {description && (
            <p id={descriptionId} className="text-muted-foreground text-sm">
              {description}
            </p>
          )}
        </div>

        {/* 본문 섹션 */}
        <div className="relative">{children}</div>

        {/* 닫기 버튼 (우측 상단) */}
        <button
          type="button"
          onClick={onClose}
          className={cn(
            'cursor-pointer hover:bg-slate-100 p-1',
            'ring-offset-background absolute top-4 right-4 rounded-full opacity-70 transition-opacity',
            'focus:ring-ring hover:opacity-100 focus:ring-2 focus:outline-none',
            'aria-disabled:pointer-events-none',
          )}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">닫기</span>
        </button>
      </div>
    </div>,
    document.body,
  )
}
