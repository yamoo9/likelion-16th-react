'use client'

import { LucideLoaderCircle } from 'lucide-react'
import Link, { type LinkProps } from 'next/link'
import { useLinkStatus } from 'next/link'
import { type ComponentPropsWithoutRef, useState } from 'react'

/**
 * [타입 정의] Props
 * Next.js의 LinkProps와 표준 <a> 태그의 속성을 결합합니다.
 * 중복되는 속성은 LinkProps를 우선하도록 설정되었습니다.
 */
interface Props extends Omit<ComponentPropsWithoutRef<'a'>, keyof LinkProps>, LinkProps {
  children: React.ReactNode
}

/**
 * [최적화 컴포넌트] HoverPrefetchLink
 * 모든 링크를 미리 불러오지 않고, 사용자가 관심을 보일 때(Hover/Focus)만 
 * 해당 페이지의 데이터를 프리페치(Prefetch)하여 초기 로딩 리소스를 절약합니다.
 */
export default function HoverPrefetchLink({
  children,
  prefetch, // 사용자가 명시적으로 전달한 prefetch 설정 (true/false)
  ...restProps
}: Props) {

  const { pending } = useLinkStatus()

  // [상태 관리] 마우스 호버 또는 포커스 여부를 추적합니다.
  const [isHovered, setIsHovered] = useState(false)

  // [이벤트 핸들러] 사용자의 상호작용이 감지되면 상태를 true로 변경합니다.
  const handlePrefetch = () => setIsHovered(true)

  return (
    <Link
      {...restProps}
      // 마우스를 올렸을 때 프리페치 시작
      onMouseEnter={handlePrefetch}
      // 키보드 탭 등으로 포커스가 갔을 때 프리페치 시작
      onFocus={handlePrefetch}
      /**
       * [프리페치 로직]
       * - 사용자가 직접 prefetch={true/false}를 넘겼다면 그 값을 우선 사용합니다.
       * - 별도 설정이 없다면(undefined), 호버/포커스 상태(isHovered)에 따라 
       *   동적으로 prefetch 여부를 결정합니다.
       */
      prefetch={prefetch !== undefined ? prefetch : isHovered}
    >
      {pending ? <LucideLoaderCircle className="animate-spin" /> : null} {children}
    </Link>
  )
}