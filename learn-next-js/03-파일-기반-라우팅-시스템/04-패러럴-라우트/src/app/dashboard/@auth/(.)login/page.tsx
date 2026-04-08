'use client'

export default function AuthLogin() {
  return (
    <div className="fixed inset-0 bg-black/10 flex justify-center items-center">
      <div role="dialog" aria-modal="true" className="h-110 bg-indigo-50 p-5 shadow-2xl">
        <h2 className="text-2xl font-bold text-indigo-700">/dashboard/login 인증 페이지 {'{auth}'}</h2>
        <span className="text-sm text-indigo-800">(src/app/dashboard/@auth/login/page.tsx)</span>

        <button className="px-2 py-1 bg-indigo-700 text-white rounded-3xl" type="button" onClick={() => window.history.back() }>닫기</button>
      </div>
    </div>
  )
}
