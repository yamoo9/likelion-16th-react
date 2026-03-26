import { RefreshCcw, AlertCircle } from 'lucide-react'
import type { FallbackProps } from 'react-error-boundary'

import { isErrorObject } from '@/utils'
import S from './style.module.css'


export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {

  const errorMessage = isErrorObject(error)
    ? error.message
    : '알 수 없는 에러가 발생했습니다.'

  return (
    <div className={S.container}>
      <article role="alert" className={S.card}>
        <div className={S.iconWrapper} aria-hidden="true">
          <AlertCircle size={48} className={S.icon} />
        </div>

        <h2 className={S.title}>문제가 발생했습니다!</h2>
        <p className={S.description}>
          포켓몬 데이터를 불러오는 중 오류가 발생했습니다.
          <br />
          잠시 후 다시 시도해 주세요.
        </p>

        <div className={S.errorDetail}>
          <code>{errorMessage}</code>
        </div>

        <button
          type="button"
          onClick={resetErrorBoundary}
          className={S.retryButton}
        >
          <RefreshCcw size={18} aria-hidden="true" />
          다시 시도하기
        </button>
      </article>
    </div>
  )
}
