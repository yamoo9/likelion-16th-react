'use client'

import Link, { type LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'

interface Props extends LinkProps {
  children: React.ReactNode | (({ isActive }: { isActive: boolean }) => React.ReactNode)
  className?: string | (({ isActive }: { isActive: boolean }) => string)
}

export default function NavLink({ href, className, children, ...restProps }: Props) {
  
  const pathname = usePathname() // 현재 경로 이름 가져오기
  
  const isActive = pathname
    .toLowerCase()
    .includes((href as string).toLowerCase()) // 활성 상태 여부 (boolean)

  let classNames = isActive ? 'text-primary font-bold' : undefined // 기본 활성 상태 클래스 이름 설정 (tailwind css)

  // 사용자가 함수를 className 속성에 전달했다면
  if (typeof className === 'function') {
    // 사용자에 의해 활성 클래스 상태를 설정하도록 구성
    classNames = className({ isActive })
  }

  return (
    <Link
      href={href}
      className={classNames}
      aria-current={isActive ? 'page' : undefined}
      {...restProps}
    >
      {/* 
        Render Props 패턴
        참고: https://ko.react.dev/reference/react/cloneElement#passing-data-with-a-render-prop 
      */}
      {typeof children === 'function' ? children({ isActive }) : children}
    </Link>
  )
}
