import { LucideInfo, LucideTags } from 'lucide-react'

import { RevalidateTagButton } from './revalidate-tag-button'
import { PokemonList } from '@/components/ui/pokemon-list'
import { Pokemon } from '@/types/pokemon'

export default async function TagBasedRevalidationPage() {
  
  /**
   * [Next.js 15/16 캐싱 전략: 태그 기반 재검증 (On-demand)]
   * 1. { next: { tags: ['pokemons'] } }를 통해 이 데이터에 이름을 붙입니다.
   * 2. 이 데이터는 누군가 수동으로 캐시를 날리기 전까지 서버에 영구적으로 캐싱될 수 있습니다.
   * 3. 데이터가 변경되었을 때(예: 포켓몬 추가/수정), 서버 액션에서
   *    revalidateTag('pokemons')를 호출하면 그 즉시 캐시가 무효화됩니다.
   */
  const response = await fetch( `${process.env.NEXT_PUBLIC_MOCK_API_URL}/pokemon`)
  // 특정 태그를 설정해 추후 정밀하게 캐시를 제어하기 위한 설정

  if (!response.ok) throw new Error('데이터를 불러오는데 실패했습니다.')
  const pokemons = (await response.json()) as Pokemon[]

  return (
    <section className="m-6 space-y-6 lg:mx-0">
      <header className="flex flex-col items-start border-b border-b-slate-200 pb-4 md:flex-row">
        <div className="md:flex-1">
          <h1 className="flex items-center gap-2 text-2xl font-bold text-slate-800">
            <span className="h-8 w-1 rounded-full bg-blue-500" />
            태그 기반 재검증 (On-demand Revalidation)
          </h1>
          <div className="mt-2 mb-3 flex flex-col gap-1 text-sm text-slate-700">
            <p className="flex items-center gap-1 font-medium text-emerald-700">
              <LucideTags className="size-4" />
              태그(On-demand) 기반
            </p>
            <p className="flex items-center gap-1">
              <LucideInfo className="size-4" />이 페이지는 특정
              태그('pokemons')를 통해 주문형으로 데이터를 갱신합니다.
            </p>
            <p className="ml-5 text-xs text-slate-500">
              <code className="rounded-sm bg-slate-100 p-0.5 px-1">
                revalidateTag('pokemons', 'default')
              </code>
              가 호출될 때만 서버에서 새 데이터를 가져옵니다.
            </p>
          </div>
        </div>
        <RevalidateTagButton />
      </header>

      <PokemonList data={pokemons} />
    </section>
  )
}
