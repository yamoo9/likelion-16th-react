import { Suspense } from 'react'
import { readMemoAction } from '@/actions/memo-actions'
import MemoForm from './memo-form'
import MemoList from './memo-list'
import { Spinner } from '@/components/ui/spinner'

export default function MemoCRUDPage() {

  /**
   * readMemoAction 서버 액션을 정의합니다. (Supabase 데이터 가져오기)
   * readMemoAction 액션를 실행한 Promise를 MemoList 컴포넌트에 전달합니다.
   */
  const memolistPromise = readMemoAction() // Promise<Memo[]>
  
  return (
    <section className="mx-auto w-9/10 max-w-3xl px-6 py-12 antialiased lg:w-3/5">
      <header className="mb-10 flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-slate-900">
            메모 <abbr>CRUD</abbr>
          </h1>
          <p className="text-sm text-slate-500">
            생성(Create) / 조회(Read) / 수정(Update) / 삭제(Delete)
          </p>
        </div>
      </header>
            
      <div className="mb-12 rounded-3xl border-2 border-slate-100 bg-slate-50/50 p-6">
        <MemoForm />
      </div>

      <Suspense fallback={<Spinner />}>
        <MemoList memolistPromise={memolistPromise} />
      </Suspense>

    </section>
  )
}
