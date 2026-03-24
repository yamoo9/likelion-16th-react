import { memo } from 'react'
import S from '../style.module.css'

interface Props {
  isError: boolean
}

export default memo(function ErrorMessage({ isError = false }: Props) {
  if (!isError) return null

  return (
    <div role="alert" className={S.alert}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mr-2"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>{' '}
      현재 에러 상태가 활성화되었습니다!
    </div>
  )
})
