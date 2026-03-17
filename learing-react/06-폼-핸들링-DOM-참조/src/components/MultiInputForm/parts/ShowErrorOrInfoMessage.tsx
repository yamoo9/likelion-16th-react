import S from '../MultiInputForm.module.css'

interface Props {
  id: string
  showError: boolean
  error: string
  infoMessage: string
}

export default function ShowErrorOrInfoMessage({
  id,
  showError,
  error,
  infoMessage,
}: Props) {
  return showError ? (
    <p id={id} role="alert" className={S.errorMessage}>
      {error}
    </p>
  ) : (
    <p id={id} className={S.infoMessage}>
      {infoMessage}
    </p>
  )
}
