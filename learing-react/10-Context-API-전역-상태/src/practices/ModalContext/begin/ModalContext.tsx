import { useId } from 'react'
import S from './ModalContext.module.css'

export function ModalProvider({ children }: React.PropsWithChildren) {
  const modalTitleId = useId()

  return (
    <div>
      {children}

      {/* 모달이 열린 경우 표시될 콘텐츠 */}
      <div role="presentation" className={S.overlay}>
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={modalTitleId}
          className={S.modal}
        >
          <h2 id={modalTitleId} className={S.title}>
            {'모달 타이틀'}
          </h2>
          <div className={S.content}>{'모달 콘텐츠'}</div>
          <button type="button" className={S.closeButton}>
            닫기
          </button>
        </div>
      </div>
    </div>
  )
}
