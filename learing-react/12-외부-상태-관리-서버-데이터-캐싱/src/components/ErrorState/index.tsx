import S from './style.module.css'

interface Props {
  message: string
}

export default function ErrorState({ message }: Props) {
  return (
    <section role="alert" className={S.error}>
      <span className={S.icon} aria-hidden="true">⚠️</span>
      <p>{message}</p>
    </section>
  )
}