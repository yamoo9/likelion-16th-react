import type { ForwardRefExoticComponent, RefAttributes } from 'react'
import type { LucideProps } from 'lucide-react'
import Link from 'next/link'

/**
 * [타입 정의] PageButtonProps
 * @param href - 이동할 페이지의 URL 경로
 * @param disabled - 버튼의 비활성화 여부 (첫 페이지나 마지막 페이지일 때 사용)
 * @param icon - Lucide-react 아이콘 컴포넌트 타입
 * @param label - 접근성을 위한 버튼 설명 (aria-label)
 */
interface PageButtonProps {
  href: string
  disabled: boolean
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
  label: string
}

/**
 * [UI 컴포넌트] PageButton
 * 페이지네이션에서 화살표 버튼(이전/다음) 역할을 수행합니다.
 * 상태에 따라 클릭 가능한 링크 또는 비활성화된 아이콘을 렌더링합니다.
 */
export default function PageButton({
  href,
  disabled,
  icon: Icon,
  label,
}: PageButtonProps) {
  
  // [비활성화 상태] 더 이상 이동할 페이지가 없을 경우
  if (disabled) {
    return (
      <span 
        className="flex h-9 w-9 cursor-not-allowed items-center justify-center rounded-lg text-zinc-300 dark:text-zinc-700"
        aria-disabled={disabled}
        aria-label={label}
      >
        <Icon className="h-4 w-4" />
      </span>
    )
  }

  // [활성화 상태] 클릭 시 해당 경로로 이동하는 링크
  return (
    <Link
      href={href}
      // 페이지 이동 시 스크롤 위치를 유지하여 사용자 경험(UX) 향상
      scroll={false}
      className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
      aria-label={label}
    >
      <Icon className="h-4 w-4" />
    </Link>
  )
}
