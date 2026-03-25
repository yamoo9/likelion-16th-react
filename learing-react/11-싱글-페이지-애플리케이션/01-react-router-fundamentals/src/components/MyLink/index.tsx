import S from './style.module.css'

export default function MyLink({
  to,
  children,
}: React.PropsWithChildren<{ to: string }>) {
  return (
    <a href={to}>
      {children}
    </a>
  )
}
