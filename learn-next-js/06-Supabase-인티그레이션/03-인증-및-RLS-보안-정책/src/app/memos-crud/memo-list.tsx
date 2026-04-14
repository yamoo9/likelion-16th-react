import { use } from 'react'

import MemoItem from './memo-item'
import type { ActionResponse, Memo } from '@/actions/memo-actions'


interface Props {
  memolistPromise: Promise<ActionResponse<Memo[]>>
}

export default function MemoList({ memolistPromise }: Props) {
  
  const result = use(memolistPromise)

  if (!result.success) {
    throw new Error(result.error)
  } else {

    const memolist = result.data

    return (
      <article className="space-y-4">
        <h3 className="px-2 text-sm font-bold tracking-tight text-slate-400">
          메모 목록 ({memolist?.length || 0})
        </h3>

        {memolist?.map((memo) => (
          <MemoItem key={memo.id} memo={memo} />
        ))}
      </article>
    )
  }
}
