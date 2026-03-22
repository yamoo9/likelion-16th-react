import { useTransition } from 'react'
import S from './style.module.css'

interface Props {
  onConfirm: () => Promise<void>
  onCancel: () => void
}

export function ConfirmDelete({ onConfirm, onCancel }: Props) {
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await onConfirm()
        onCancel()
      } catch (error) {
        console.error('삭제 실패:', error)
      }
    })
  }

  return (
    <article className={S.container}>
      <header className={S.header}>
        <h3 className={S.title}>정말로 삭제하시겠습니까?</h3>
        <p className={S.description}>
          이 작업은 되돌릴 수 없습니다.
          <br />
          삭제 시 서버에서 데이터가 영구적으로 제거됩니다.
        </p>
      </header>

      <div role="button" className={S.footer}>
        <button
          type="button"
          className={`${S.button} ${S.cancelBtn}`}
          onClick={onCancel}
          disabled={isPending}
        >
          취소
        </button>
        <button
          type="button"
          className={`${S.button} ${S.confirmBtn}`}
          onClick={handleDelete}
          disabled={isPending}
        >
          {isPending ? '삭제 중...' : '확인'}
        </button>
      </div>
    </article>
  )
}
