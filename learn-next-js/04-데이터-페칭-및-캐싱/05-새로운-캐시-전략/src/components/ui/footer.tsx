async function getCachedTime() {
  return new Date().getFullYear()
}

export default async function Footer() {
  const currentYear = await getCachedTime()

  return (
    <footer
      lang="en"
      className="border-t border-slate-100 py-8 text-center text-xs text-slate-400"
    >
      © {currentYear} EUID. Copyright all reserved.
    </footer>
  )
}