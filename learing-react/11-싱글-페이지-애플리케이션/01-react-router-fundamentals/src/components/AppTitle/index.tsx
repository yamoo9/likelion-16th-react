interface Props {
  subTitle?: string
}

export default function AppTitle({ subTitle }: Props) {
  let appTitle = import.meta.env.VITE_BASE_NAME

  if (subTitle) {
    appTitle = `${subTitle} < ${appTitle}`
  }

  return <title>{appTitle}</title>
}
