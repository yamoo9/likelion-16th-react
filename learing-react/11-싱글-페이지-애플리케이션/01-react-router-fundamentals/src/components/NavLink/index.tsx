import { NavLink as OriginalNavLink, type To } from 'react-router-dom'
import S from './style.module.css'

export default function NavLink({
  to,
  children,
}: React.PropsWithChildren<{ to: To }>) {
  return (
    <OriginalNavLink
      to={to}
      className={({ isActive }) => (isActive ? S.active : undefined)}
    >
      {children}
    </OriginalNavLink>
  )
}
