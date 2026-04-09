import { FileText } from 'lucide-react'
import MemoItem from '../memos-crud/memo-item'
import type { Memo } from '@/actions/memo-actions'

export default async function RLSSecurePage() {
  
  // 서버용 Supabase 클라이언트를 생성합니다.

  // 로그인 사용자 정보를 가져옵니다.
  const user = null as unknown as User
  const authError = new Error('인증 사용자인지 확인하는 로직이 필요합니다.')

  if (authError || !user) {
    // 인증 에러 또는 인증된 사용자가 없을 경우, '/auth-basic/signin' 경로로 리디렉션 합니다.
    return (
      <section className="mx-auto max-w-3xl bg-slate-50/50 p-6 md:p-8 mt-10">
        <p
          role="alert"
          className="rounded-full border border-red-100 bg-red-50 px-6 py-2 font-semibold text-red-600"
        >
          🚨 로그인 사용자만 이용할 수 있습니다.
        </p>
      </section>
    )
  }

  // memos 데이터베이스에서 로그인 사용자의 메모를 모두 가져옵니다.
  const memos = [] as Memo[]
  const dbError = new Error(
    'memos 데이터베이스에서 로그인 사용자의 메모를 모두 가져오는 로직이 필요합니다.',
  )

  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-12 antialiased">
      <header className="mb-10">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">
          내가 작성한 메모 목록 <span className="text-lg font-medium text-slate-400">({memos?.length || 0})</span>
        </h1>
        
        <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-5 text-sm">
          <p className="font-semibold text-blue-800">🔒 RLS 보안 적용 모드</p>
          <p className="text-blue-600/80">접속 계정: {user.email}</p>
        </div>
      </header>

      {dbError ? (
        <div className="py-20 text-center text-red-500">데이터 로드 오류</div>
      ) : (
        <div className="grid gap-6">
          {memos?.length === 0 ? (
            <div className="py-24 text-center border border-dashed rounded-3xl text-slate-400">
              <FileText className="mx-auto mb-4 opacity-20" size={56} />
              <p>작성된 메모가 없습니다.</p>
            </div>
          ) : (
            memos?.map((memo) => (
              <MemoItem key={memo.id} memo={memo} />
            ))
          )}
        </div>
      )}
    </section>
  )
}
