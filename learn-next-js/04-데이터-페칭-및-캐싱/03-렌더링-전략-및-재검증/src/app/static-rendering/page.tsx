// Next.js의 Route Segment Config (파일 최상단에 추가)
// 이 설정을 통해 페이지를 빌드 시점에 정적 HTML로 생성하도록 강제합니다.

// --------------------------------------------------------------------------------------------

import { LucideInfo, LucideGlobe } from 'lucide-react'

import { PokemonList } from '@/components/ui/pokemon-list'
import { Pokemon } from '@/types/pokemon'

export default async function StaticRenderingPage() {
  
  // fetch에 별도 옵션이 없어도 위 dynamic 설정이 우선순위를 가집니다.
  // 명시적으로 cache: 'force-cache'를 추가하여 정적 캐싱을 확실히 할 수 있습니다.
  const response = await fetch(`${process.env.MOCK_API_URL}/pokemon`)

  if (!response.ok) throw new Error('데이터를 불러오는데 실패했습니다.')
  const pokemons = (await response.json()) as Pokemon[]

  return (
    <section className="m-6 space-y-6 lg:mx-0">
      <header className="flex flex-col items-start border-b border-b-slate-200 pb-4 md:flex-row">
        <div className="md:flex-1">
          <h1 className="flex items-center gap-2 text-2xl font-bold text-slate-800">
            <span className="h-8 w-1 rounded-full bg-indigo-500" />
            정적 렌더링 (Static Rendering)
          </h1>
          <div className="mt-2 mb-3 flex flex-col gap-1 text-sm text-slate-700">
            <p className="flex items-center gap-1 font-medium text-indigo-600">
              <LucideGlobe className="size-4" />
              빌드 시점(Build Time) 생성
            </p>
            <p className="flex items-center gap-1">
              <LucideInfo className="size-4" />
              이 페이지는 빌드 시점에 한 번만 생성되며, 모든 사용자에게 동일한 캐시 데이터를 제공합니다.
            </p>
            <p className="ml-5 text-xs text-slate-500">
              <code className="rounded-sm bg-slate-100 p-0.5 px-1">
                bun run build && bun start
              </code>{' '}
              환경에서 서버 로그를 통해 추가적인 데이터 요청이 발생하지 않음을 확인할 수 있습니다.
            </p>
          </div>
        </div>
      </header>

      <PokemonList data={pokemons} />
    </section>
  )
}