import Link from 'next/link'

export default function DashboardPage() {
  return (
    <section className="h-110 self-stretch bg-teal-100 p-5 flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-teal-700">/dashboard/login 페이지 {'{children}'}</h1>
      <span className="text-sm text-teal-800">(src/app/dashboard/login/page.tsx)</span>
      <div>
        <Link href="/dashboard" className='p-2 px-4 rounded-full bg-teal-200'>대시보드</Link>
      </div>
    </section>
  )
}
