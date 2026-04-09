import { LucideInfo, LucideZap } from 'lucide-react'

import { type Pokemon } from '@/types/pokemon'
import { PokemonList } from './_resources/pokemon-list'

async function getPokemons(): Promise<Pokemon[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_MOCK_API_URL}/pokemon`)
  if (!response.ok) throw new Error('데이터를 불러오는데 실패했습니다.')
  return response.json()
}

export default async function ServerStreamingPage() {
  
  // 서버에서 Promise를 생성 (await 하지 않음)
  const pokemons = await getPokemons()

  return (
    <section className="m-6 space-y-6 md:mx-0">
      <header className="border-b border-b-slate-200 pb-4">
        <h1 className="flex items-center gap-2 text-2xl font-bold text-slate-800">
          <LucideZap className="h-6 w-6 text-emerald-500" />
          스트리밍 & 서스펜스 데이터 페칭
        </h1>
        <p className="mt-2 flex items-center gap-1 text-sm text-slate-500">
          <LucideInfo className="h-4 w-4" />
          서버에서 준비된 데이터부터 즉시 화면에 그리는 Next.js의 최신 렌더링 방식입니다.
        </p>
      </header>

      {/* Suspense가 Promise의 상태를 감지하여 fallback을 보여줍니다. */}
      {/* 서버 컴포넌트 */}
      {/* 클라이언트 컴포넌트 */}
      <PokemonList data={pokemons} />
    </section>
  )
}