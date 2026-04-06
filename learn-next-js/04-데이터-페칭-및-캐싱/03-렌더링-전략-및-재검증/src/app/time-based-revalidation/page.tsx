// Next.js의 Route Segment Config
// 이 설정을 통해 페이지의 재검증(Revalidation) 주기를 설정합니다.
// 60초가 지나기 전까지는 캐시된 정적 페이지를 보여주고, 그 이후 요청이 오면 백그라운드에서 데이터를 갱신합니다.

// --------------------------------------------------------------------------------------------

import { LucideInfo, LucideRefreshCw } from 'lucide-react'

import { PokemonList } from '@/components/ui/pokemon-list'
import { Pokemon } from '@/types/pokemon'

export default async function TimeBasedRevalidationPage() {
  
  // fetch 레벨에서도 revalidate 옵션을 설정할 수 있습니다.
  // 위에서 선언한 export const revalidate 설정이 이 fetch에도 적용됩니다.
  const response = await fetch(`${process.env.MOCK_API_URL}/pokemon`)

  if (!response.ok) throw new Error('데이터를 불러오는데 실패했습니다.')
  const pokemons = (await response.json()) as Pokemon[]

  return (
    <section className="m-6 space-y-6 lg:mx-0">
      <header className="flex flex-col items-start border-b border-b-slate-200 pb-4 md:flex-row">
        <div className="md:flex-1">
          <h1 className="flex items-center gap-2 text-2xl font-bold text-slate-800">
            <span className="h-8 w-1 rounded-full bg-amber-500" />
            증분 정적 재생성 (ISR)
          </h1>
          <div className="mt-2 mb-3 flex flex-col gap-1 text-sm text-slate-700">
            <p className="flex items-center gap-1 font-medium text-amber-600">
              <LucideRefreshCw className="size-4" />
              시간 기반 재검증 (Time-based Revalidation)
            </p>
            <p className="flex items-center gap-1">
              <LucideInfo className="size-4" />이 페이지는 설정된 주기(60초)마다
              백그라운드에서 데이터를 새롭게 갱신합니다.
            </p>
            <p className="ml-5 text-xs text-slate-500">
              사용자는 항상 빠른 정적 페이지를 응답받으며, 데이터는 주기적으로
              최신 상태를 유지합니다.
            </p>
          </div>
        </div>
      </header>

      <PokemonList data={pokemons} />
    </section>
  )
}
