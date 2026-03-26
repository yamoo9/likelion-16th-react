import { useState, useRef, useEffect, useCallback } from 'react'

import { useTheme, type Theme } from '@/stores/themeStore' 
import { DarkIcon, LightIcon, SystemIcon } from './ThemeIcons'
import S from './style.module.css'

interface ThemeOption {
  id: Theme
  label: string
  icon: React.ReactNode
}

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

  /**
   * 테마 선택 핸들러
   * 스토어의 setTheme을 호출하고 메뉴를 닫은 후 버튼으로 포커스를 돌려줍니다.
   */
  const handleSelect = (id: Theme) => {
    setTheme(id)
    closeMenu()
    openButtonRef.current?.focus()
  }

  // 메뉴가 열릴 때 현재 선택된 아이템으로 포커스 이동 (접근성)
  useEffect(() => {
    if (isOpen && menuRef.current) {
      const activeItem = menuRef.current.querySelector<HTMLButtonElement>(
        '[aria-selected="true"]',
      )
      activeItem?.focus()
    }
  }, [isOpen])

  // 외부 클릭 감지 및 키보드 내비게이션 (Esc, 화살표 키)
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        closeMenu()
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      const { key } = e
      if (!isOpen) return

      if (key === 'Escape') {
        closeMenu()
        openButtonRef.current?.focus()
        return
      }

      if (key === 'ArrowDown' || key === 'ArrowUp') {
        e.preventDefault()
        const buttons = Array.from(menuRef.current?.querySelectorAll('button') ?? [])
        const length = buttons.length
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