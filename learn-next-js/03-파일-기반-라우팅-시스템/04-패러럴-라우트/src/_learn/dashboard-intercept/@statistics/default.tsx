export default function Statistics() {
  return (
    <div className="flex h-100 flex-col gap-1 bg-zinc-200 p-5">
      <h2 className="text-2xl font-bold text-zinc-700">통계 {'(default)'}</h2>
      <div className="flex flex-col gap-4">
        <span className="text-xs text-zinc-800">
          (src/app/dashboard/@statistics/default.tsx)
        </span>
        <p className="text-[13px] leading-relaxed">
          <code>@statistics</code> 슬롯은 <code>/dashboard/login</code>경로를
          포함하지 않아 하드 내비게이션(새로 고침) 시 <code>default.tsx</code>가
          없으면 오류가 발생합니다.
        </p>
      </div>
    </div>
  )
}
