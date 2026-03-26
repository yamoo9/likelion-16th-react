export default function Title({ children }: React.PropsWithChildren) {
  const title = `${children} ⚡️ ${import.meta.env.VITE_BASE_NAME}`
  return <title>{title}</title>
}
