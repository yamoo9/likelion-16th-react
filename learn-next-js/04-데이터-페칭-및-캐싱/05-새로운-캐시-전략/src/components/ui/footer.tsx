// async function getCachedTime() {
//   return new Date().getFullYear()
// }

import { Suspense } from 'react'
import { Copyright } from '@/app/Copyright'

export default async function Footer() {
  // const currentYear = await getCachedTime()
  return (
    <footer
      lang="en"
      className="border-t border-slate-100 py-8 text-center text-xs text-slate-400"
    >
      <Suspense>
        {/* Dynamic */}
        <Copyright />
      </Suspense>
      {/* © {currentYear} EUID. Copyright all reserved. */}
    </footer>
  )
}
