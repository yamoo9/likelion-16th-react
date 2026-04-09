import { createMemoAction } from '@/actions/memo-actions'

export default function MemoForm() {
  return (
    <form action={createMemoAction} className="flex flex-col gap-3">
      <input
        name="title"
        placeholder="제목"
        required
        className="rounded-xl border border-slate-200 px-4 py-2"
      />
      <textarea
        name="content"
        placeholder="내용"
        required
        rows={3}
        className="min-h-40 rounded-xl border border-slate-200 px-4 py-2"
      />
      <button
        type="submit"
        className="rounded-xl bg-slate-900 py-2.5 font-bold text-white"
      >
        메모 저장
      </button>
    </form>
  )
}
