// Next.js의 Route Segment Config
// 이 설정을 통해 빌드 시점이 아닌, 매 요청(Request)마다 서버에서 페이지를 새로 생성하도록 강제합니다.

// --------------------------------------------------------------------------------------------

import { LucideInfo, LucideZap } from 'lucide-react'

import { PokemonList } from '@/components/ui/pokemon-list'
import { Pokemon } from '@/types/pokemon'

export default async function DynamicRenderingPage() {
  
  // Next.js 15부터 fetch의 기본값은 'no-store'이므로, 명시하지 않아도 동적으로 작동합니다.
  const response = await fetch(`${process.env.MOCK_API_URL}/pokemon`)

  if (!response.ok) throw new Error('데이터를 불러오는데 실패했습니다.')
  const pokemons = (await response.json()) as Pokemon[]

  return (
    <section className="m-6 space-y-6 lg:mx-0">
      <header className="flex flex-col items-start border-b border-b-slate-200 pb-4 md:flex-row">
        <div className="md:flex-1">
          <h1 className="flex items-center gap-2 text-2xl font-bold text-slate-800">
            <span className="h-8 w-1 rounded-full bg-rose-500" />
            동적 렌더링 (Dynamic Rendering)
          </h1>
          <div className="mt-2 mb-3 flex flex-col gap-1 text-sm text-slate-700">
            <p className="flex items-center gap-1 font-medium text-rose-600">
              <LucideZap className="size-4" />
              요청 시점(Request Time) 생성
            </p>
            <p className="flex items-center gap-1">
              <LucideInfo className="size-4" />이 페이지는 사용자가 접속할
              때마다 서버에서 최신 데이터를 페칭하여 즉석에서 렌더링합니다.
            </p>
            <p className="ml-5 text-xs text-slate-500">
              개인화된 데이터(쿠키, 헤더)나 실시간성이 중요한 정보를 표시할 때
              사용됩니다.
            </p>
          </div>
        </div>
      </header>

      <PokemonList data={pokemons} />
    </section>
  )
}
