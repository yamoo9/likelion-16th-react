import S from './style.module.css'

interface Props {
  message?: string
}

export default function LoadingState({ message = '로딩 중...' }: Props) {
  return (
    <section role="status" aria-live="polite" className={S.loading}>
      <span className={S.spinner} aria-hidden="true"></span>
      <p className={S.message}>{message}</p>
    </section>
  )
}
