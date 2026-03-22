import { DarkIcon, LightIcon, SystemIcon } from './ThemeIcons'
import S from './ThemeSwitcher.module.css'

interface ThemeOption {
  readonly id: string
  readonly label: string
  readonly icon: React.ReactElement
}

const THEME_OPTIONS: readonly ThemeOption[] = [
  { id: 'system', label: '시스템', icon: <SystemIcon /> },
  { id: 'light', label: '라이트', icon: <LightIcon /> },
  { id: 'dark', label: '다크', icon: <DarkIcon /> },
] as const

export function ThemeSwitcher(): React.ReactElement {
  const theme = 'system'
  const isOpen = false
  const currentOption = THEME_OPTIONS.find((option) => option.id === theme)

  return (
    <div className={S.container}>
      <button type="button" className={S.trigger}>
        <span className={S.icon} aria-hidden="true">
          {currentOption?.icon}
        </span>
      </button>

      {isOpen && (
        <ul className={S.menu}>
          {THEME_OPTIONS.map(({ id, label, icon }) => {
            const isActive = theme === id

            return (
              <li key={id} role="none">
                <button
                  type="button"
                  className={`${S.menuItem} ${isActive ? S.active : ''}`}
                >
                  <span className={S.icon}>{icon}</span>
                  <span className={S.label}>{label}</span>
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
