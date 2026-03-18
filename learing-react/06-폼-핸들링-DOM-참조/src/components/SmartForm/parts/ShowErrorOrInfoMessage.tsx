import S from '../SmartForm.module.css'

interface Props {
  id: string
  hint: string
  error: string
}

export default function ShowErrorOrInfoMessage({ id, hint, error }: Props) {
  
  const showError = error !== ''

  return (
    <p
      id={id}
      role={showError ? 'alert' : undefined}
      className={showError ? S.errorMessage : S.infoMessage}
    >
      {showError ? error : hint}
    </p>
  )
}
