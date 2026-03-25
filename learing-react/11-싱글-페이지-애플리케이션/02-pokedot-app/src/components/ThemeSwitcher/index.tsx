import { useState, useRef, useEffect, useCallback } from 'react'
import { useTheme, type Theme, type ThemeOption } from '@/contexts/ThemeContext'
import { DarkIcon, LightIcon, SystemIcon } from './ThemeIcons'
import S from './style.module.css'

const THEME_OPTIONS: readonly ThemeOption[] = [
  { id: 'system', label: '시스템', icon: <SystemIcon /> },
  { id: 'light', label: '라이트', icon: <LightIcon /> },
  { id: 'dark', label: '다크', icon: <DarkIcon /> },
] as const

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLUListElement>(null)
  const openButtonRef = useRef<HTMLButtonElement>(null)

  const toggleMenu = () => setIsOpen((prev) => !prev)
  const closeMenu = useCallback(() => setIsOpen(false), [])

  const handleSelect = (id: Theme) => {
    setTheme(id)
    closeMenu()
    openButtonRef.current?.focus()
  }

  useEffect(() => {
    const menu = menuRef.current
    if (isOpen && menu) {
      const activeItem = menu.querySelector<HTMLButtonElement>(
        '[aria-selected="true"]',
      )
      activeItem?.focus()
    }
  }, [isOpen])

  useEffect(() => {
    const container = containerRef.current
    const menu = menuRef.current
    const openButton = openButtonRef.current

    const handleClickOutside = (e: MouseEvent) => {
      if (container && !container.contains(e.target as Node)) {
        closeMenu()
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      const { key } = e
      if (!isOpen) return

      if (key === 'Escape') {
        closeMenu()
        openButton?.focus()
        return
      }

      if (key === 'ArrowDown' || key === 'ArrowUp') {
        e.preventDefault()

        const buttons = Array.from(menu?.querySelectorAll('button') ?? [])
        const { length } = buttons
        const activeElement = document.activeElement as HTMLButtonElement
        const currentIndex = buttons.indexOf(activeElement)

        let nextIndex
        if (key === 'ArrowDown') {
          nextIndex = (currentIndex + 1) % length
        } else {
          nextIndex = (currentIndex - 1 + length) % length
        }

        buttons[nextIndex]?.focus()
      }
    }

    if (isOpen) {
      document.addEventListener('click', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, closeMenu])

  const currentOption = THEME_OPTIONS.find((option) => option.id === theme)

  return (
    <div ref={containerRef} className={S.container}>
      <button
        type="button"
        ref={openButtonRef}
        className={S.trigger}
        aria-label="테마 변경 메뉴 열기"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={toggleMenu}
      >
        <span className={S.icon} aria-hidden="true">
          {currentOption?.icon}
        </span>
      </button>

      {isOpen && (
        <ul ref={menuRef} className={S.menu} role="listbox">
          {THEME_OPTIONS.map(({ id, label, icon }) => {
            const isActive = theme === id

            return (
              <li key={id} role="none">
                <button
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  className={`${S.menuItem} ${isActive ? S.active : ''}`}
                  onClick={() => handleSelect(id)}
                >
                  <span className={S.icon} aria-hidden="true">
                    {icon}
                  </span>
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
