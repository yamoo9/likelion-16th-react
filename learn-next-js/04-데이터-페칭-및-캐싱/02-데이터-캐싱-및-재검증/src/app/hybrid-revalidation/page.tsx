import { LucideInfo, LucideZap } from 'lucide-react'

import { RevalidateHybridButton } from './revalidate-hybrid-button'
import { PokemonList } from '@/components/ui/pokemon-list'
import { Pokemon } from '@/types/pokemon'

export default async function HybridRevalidationPage() {
  
  /**
   * [Next.js 15/16 하이브리드 재검증 전략]
   * 1. 시간 기반(ISR): 60초마다 백그라운드에서 자동으로 데이터를 갱신합니다.
   * 2. 주문형(On-demand): 'pokemons' 태그를 사용하여 60초가 지나지 않았더라도 
   *    Server Action(revalidateTag)을 통해 즉시 수동 갱신이 가능합니다.
   */
  const response = await fetch(`${process.env.MOCK_API_URL}/pokemon`)
  // - 60초 자동 갱신
  // - 수동 갱신을 위한 태그 설정

  if (!response.ok) throw new Error('데이터를 불러오는데 실패했습니다.')
  const pokemons = (await response.json()) as Pokemon[]

  return (
    <section className="m-6 space-y-6 lg:mx-0">
      <header className="flex flex-col items-start border-b border-b-slate-200 pb-4 md:flex-row">
        <div className="md:flex-1">
          <h1 className="flex items-center gap-2 text-2xl font-bold text-slate-800">
            <span className="h-8 w-1 rounded-full bg-amber-500" />
            하이브리드 재검증 (Hybrid)
          </h1>
          <div className="mt-2 mb-3 flex flex-col gap-1 text-sm text-slate-700">
            <p className="flex items-center gap-1 font-medium text-amber-700">
              <LucideZap className="size-4" />
              시간(Time) + 태그(On-demand) 기반 결합
            </p>
            <p className="flex items-center gap-1">
              <LucideInfo className="size-4" />
              60초마다 갱신되지만, 재검증 버튼을 누르면 즉시 갱신됩니다.
            </p>
            <p className="ml-5 text-xs text-slate-500">
              <code className="rounded-sm bg-slate-100 p-0.5 px-1">
                revalidateTag('pokemons', 'default')
              </code>{' '}
              함수가 실행되어 캐시를 즉시 무효화합니다.
            </p>
          </div>
        </div>
        
        <RevalidateHybridButton />
      </header>

      <PokemonList data={pokemons} />
    </section>
  )
}