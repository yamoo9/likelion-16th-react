import { use } from 'react'
import MemoItem from './memo-item'

interface Props {
  memosPromise?: Promise<unknown[]>
}

export default function MemoList({ memosPromise }: Props) {

  if (!memosPromise) return null

  const memos = use(memosPromise)

  return (
    <article className="space-y-4">
      <h3 className="px-2 text-sm font-bold tracking-tight text-slate-400 uppercase">
        메모 목록 ({memos?.length || 0})
      </h3>

      {memos?.map((memo, index) => (
        <MemoItem key={index} />
      ))}
    </article>
  )
}
