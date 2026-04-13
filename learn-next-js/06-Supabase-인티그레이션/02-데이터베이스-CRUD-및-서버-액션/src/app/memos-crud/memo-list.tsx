import { use } from 'react'
import MemoItem from './memo-item'
import { type Memo } from '@/actions/memo-actions'

interface Props {
  memolistPromise?: Promise<Memo[]>
}

export default function MemoList({ memolistPromise }: Props) {

  if (!memolistPromise) return null

  const memolist = use(memolistPromise)

  return (
    <article className="space-y-4">
      <h3 className="px-2 text-sm font-bold tracking-tight text-slate-400 uppercase">
        메모 목록 ({memolist?.length || 0})
      </h3>

      {memolist?.map((memo) => (
        <MemoItem key={memo.id} memo={memo} />
      ))}
    </article>
  )
}
