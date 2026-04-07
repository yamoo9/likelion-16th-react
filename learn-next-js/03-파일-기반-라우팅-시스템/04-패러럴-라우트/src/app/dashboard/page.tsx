import Link from 'next/link'

export default function DashboardPage() {
  return (
    <section className="h-110 self-stretch bg-rose-100 p-5 flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-rose-700">/dashboard 페이지 {'{children}'}</h1>
      <span className="text-sm text-rose-800">(src/app/dashboard/page.tsx)</span>
      <div>
        <Link href="/dashboard/login" className='p-2 px-4 rounded-full bg-rose-200'>로그인 폼</Link>
      </div>
    </section>
  )
}
