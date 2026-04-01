export default function UserListSkeleton() {
  return (
    <div role="status" className="grid w-full gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 rounded-xl bg-white p-4"
        >
          {/* 아바타 스켈레톤 */}
          <div className="h-12 w-12 animate-pulse rounded-full bg-slate-200" />

          {/* 텍스트 스켈레톤 */}
          <div className="flex-1 space-y-2">
            <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
            <div className="h-3 w-48 animate-pulse rounded bg-slate-100" />
          </div>
        </div>
      ))}
      <span className="sr-only">로딩 중...</span>
    </div>
  )
}
