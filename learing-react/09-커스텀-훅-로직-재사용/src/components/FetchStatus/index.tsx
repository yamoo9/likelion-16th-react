import S from './style.module.css'

type Props = React.PropsWithChildren<{
  isLoading: boolean
  loadingFallback?: React.ReactElement
  error: Error | null
  errorFallback?: React.ReactElement | ((message: string) => React.ReactElement)
  onRetry?: () => void
}>

// 조건부 UI 렌더링 (선언적 API)
export default function FetchStatus({
  isLoading,
  loadingFallback,
  error,
  errorFallback,
  onRetry,
  children,
}: Props) {
  // 로딩 상태 처리
  if (isLoading) {
    return loadingFallback ? (
      loadingFallback
    ) : (
      <div className={S.statusContainer}>
        <div role="status" aria-busy="true" className={S.loading}>
          데이터 로딩 중...
        </div>
      </div>
    )
  }

  // 에러 상태 처리
  if (error) {
    if (typeof errorFallback === 'function') {
      return errorFallback(error.message)
    } else {
      return errorFallback ? (
        errorFallback
      ) : (
        <div className={S.statusContainer}>
          <div role="alert" className={S.errorBox}>
            <p>{error.message}</p>
          </div>
          {onRetry && (
            <button type="button" className={S.button} onClick={onRetry}>
              에러 복구
            </button>
          )}
        </div>
      )
    }
  }

  // 데이터 상태
  return <>{children}</>
}
