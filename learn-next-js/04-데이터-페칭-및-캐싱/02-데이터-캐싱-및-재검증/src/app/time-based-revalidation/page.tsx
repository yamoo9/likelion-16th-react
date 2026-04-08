import { LucideInfo, LucideTimer } from 'lucide-react'

import { RevalidatePathButton } from './revalidate-path-button'
import { PokemonList } from '@/components/ui/pokemon-list'
import { Pokemon } from '@/types/pokemon'

export default async function TimeBasedRevalidationPage() {
  /**
   * [Next.js 15/16 캐싱 전략: 시간 기반 재검증 (ISR)]
   * 1. { next: { revalidate: 60 } } 설정을 통해 60초 동안 데이터를 캐싱합니다.
   * 2. 60초 이내의 요청은 서버에 저장된 캐시 데이터를 즉시 반환합니다.
   * 3. 60초가 지난 후 첫 접속자가 오면, 서버는 '이전 캐시'를 먼저 보여준 뒤
   *    백그라운드에서 데이터를 새로 가져와 캐시를 갱신합니다. (Stale-While-Revalidate)
   */
  const response = await fetch(`${process.env.MOCK_API_URL}/pokemon`, {
    // cache: 'no-store' // 기본적으로 기억하지 않음 (즉, 개발자가 필요할 때 기억하도록 설정할 것!)
    cache: 'force-cache', // 개발자가 요청/응답 결과를 캐시(기억) 설정
    next: { revalidate: 3600 } // 1시간 마다 새 데이터로 다시 정적 생성한 결과 캐싱(기억)
  })

  if (!response.ok) throw new Error('데이터를 불러오는데 실패했습니다.')
  const pokemons = (await response.json()) as Pokemon[]

  return (
    <section className="m-6 space-y-6 lg:mx-0">
      <header className="flex flex-col items-start border-b border-b-slate-200 pb-4 md:flex-row">
        <div className="md:flex-1">
          <h1 className="flex items-center gap-2 text-2xl font-bold text-slate-800">
            <span className="h-8 w-1 rounded-full bg-blue-500" />
            시간 기반 재검증 (ISR)
          </h1>
          <div className="mt-2 mb-3 flex flex-col gap-1 text-sm text-slate-700">
            <p className="flex items-center gap-1 font-medium text-blue-600">
              <LucideTimer className="size-4" />
              시간(Time) 기반
            </p>
            <p className="flex items-center gap-1">
              <LucideInfo className="size-4" />이 페이지는 60초마다 데이터를
              새로 고침하도록 설정되어 있습니다.
            </p>
            <p className="ml-5 text-xs text-slate-500">
              <code className="rounded-sm bg-slate-100 p-0.5 px-1">
                bun run build && bun start
              </code>{' '}
              환경에서 정확한 캐싱 작동을 확인할 수 있습니다.
            </p>
          </div>
        </div>
        <RevalidatePathButton />
      </header>

      <PokemonList data={pokemons} />
    </section>
  )
}
