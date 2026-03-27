import { useTheme } from '@/contexts'
import S from '../style.module.css'

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
  const { mode, scheme } = useTheme()

  return showError ? (
    <p id={id} role="alert" className={S.errorMessage}>
      {error}
    </p>
  ) : (
    <p
      style={{ color: scheme.textColor, background: scheme.backgroundColor }}
      id={id}
      className={S.infoMessage}
    >
      {infoMessage} ({mode})
    </p>
  )
}
