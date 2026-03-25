import S from './style.module.css'

type Props = React.PropsWithChildren<{
  title: string
  showTitle?: boolean
  subtitle?: string
}>

export default function PageLayout({
  title,
  showTitle = false,
  subtitle,
  children,
}: Props) {
  return (
    <main className={S.main}>
      <section className={S.headerSection}>
        <h2 className={`${S.title} ${!showTitle ? 'sr-only' : ''}`.trim()}>
          {title}
        </h2>
        {subtitle && <p className={S.subtitle}>{subtitle}</p>}
      </section>
      {children}
    </main>
  )
}
