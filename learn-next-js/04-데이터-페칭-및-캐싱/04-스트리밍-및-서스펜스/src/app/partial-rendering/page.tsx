import { LucideInfo, LucideMousePointer2 } from 'lucide-react'
import { PokemonView } from './pokemon-view'

// 서버 컴포넌트
export default function PartialRenderingPage() {
  return (
    <section className="m-6 space-y-6 md:mx-0">
      <header className="border-b border-b-slate-200 pb-4">
        <h1 className="flex items-center gap-2 text-2xl font-bold text-slate-800">
          <LucideMousePointer2 className="h-6 w-6 text-blue-500" />
          클라이언트 사이드 데이터 페칭
        </h1>
        <p className="mt-2 flex items-center gap-1 text-sm text-slate-500">
          <LucideInfo className="h-4 w-4" />
          브라우저 마운트 후 데이터를 호출하며, 로딩 및 에러 상태를 직접
          관리합니다.
        </p>
      </header>
      {/* 클라이언트 컴포넌트 */}
      <PokemonView />
    </section>
  )
}


