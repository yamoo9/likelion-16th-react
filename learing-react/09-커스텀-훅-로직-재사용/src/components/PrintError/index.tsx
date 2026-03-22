import S from './style.module.css'

interface Props {
  message: string
  onRetry?: () => void
}

export default function PrintError({ message, onRetry }: Props) {
  return (
    <div className={S.errorView}>
      <div className={S.iconWrapper}>🚨</div>
      <h3 className={S.title}>에러 발생</h3>
      <p className={S.description}>{message}</p>
      {onRetry && (
        <button type="button" className={S.retryButton} onClick={onRetry}>
          다시 연결 시도
        </button>
      )}
    </div>
  )
}
