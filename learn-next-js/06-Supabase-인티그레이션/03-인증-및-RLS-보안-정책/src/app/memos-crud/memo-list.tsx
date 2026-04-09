import { use } from 'react'

import { Memo } from '@/actions/memo-actions'
import MemoItem from './memo-item'

interface Props {
  memosPromise: Promise<Memo[]>
}

export default function MemoList({ memosPromise }: Props) {
  const memos = use(memosPromise)

  return (
    <article className="space-y-4">
      <h3 className="px-2 text-sm font-bold tracking-tight text-slate-400 uppercase">
        메모 목록 ({memos?.length || 0})
      </h3>

      {memos?.map((memo) => (
        <MemoItem key={memo.id} memo={memo} />
      ))}
    </article>
  )
}
