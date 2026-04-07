'use client'

export default function AuthLogin() {
  return (
    <div className="bg-black/10 fixed inset-0 flex justify-center items-center">
      <div className="h-110 w-110 bg-indigo-50 p-5 shadow-2xl rounded-2xl flex flex-col">
        <h2 className="text-2xl font-bold text-indigo-700">/dashboard/login 인증 페이지 {'{auth}'}</h2>
        <span className="text-sm text-indigo-800">(src/app/dashboard/@auth/login/page.tsx)</span>
        <button type="button" className="px-2 py-1 border rounded-2xl self-start mt-2" onClick={() => window.history.back()}>뒤로가기</button>
      </div>
    </div>
  )
}
