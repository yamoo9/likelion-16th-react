import S from './style.module.css'

interface Props {
  isOn: boolean
  onToggle: () => void
  label?: string
}

export default function Switch({ isOn, onToggle, label }: Props) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={isOn}
      aria-label={label}
      className={`${S.switchRoot} ${isOn ? S.checked : ''}`.trim()}
      onClick={onToggle}
    >
      <span className={S.switchThumb} />
    </button>
  )
}
