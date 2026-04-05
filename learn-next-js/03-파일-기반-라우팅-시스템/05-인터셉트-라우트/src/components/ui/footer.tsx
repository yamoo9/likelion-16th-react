export default function Footer() {
  return (
    <footer
      lang="en"
      className="border-t border-slate-100 py-8 text-center text-xs text-slate-400"
    >
      © {new Date().getFullYear()} URBAN_LIB. Built with Next.js 16.
    </footer>
  )
}
