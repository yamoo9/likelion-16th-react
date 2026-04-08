import { Suspense } from 'react'
import { LucideServer } from 'lucide-react'
import { PokemonList } from './pokemon-list'
import { Spinner } from '@/components/ui/spinner'

/**
 * [서버 → 클라이언트 컴포넌트 Promise 전달 : 스트리밍]
 */

const pokemonApiUrl = `${process.env.MOCK_API_URL}/pokemon`

export default function ServerSideWithUsePage() {
  const pokemonsPromise = fetch(pokemonApiUrl)
    .then((response) => response.json()) // 스트리밍으로 클라이언트 컴포넌트에 전달할 데이터 직렬화 (JSON)

  return (
    <section className="m-6 space-y-6 md:mx-0">
      <header className="border-b border-b-slate-200 pb-4">
        <h1 className="flex items-center gap-2 text-2xl font-bold text-slate-800">
          <span className="h-8 w-1 rounded-full bg-blue-500" />
          데이터 스트리밍하기 (서버 → 클라이언트)
        </h1>
        <p className="mt-2 flex items-center gap-3 text-sm text-slate-500">
          <LucideServer className="size-4" />
          서버에서 데이터를 직접 조회하여 완성된 HTML을 전달하므로
          <br className="md:hidden" />
          초기 로딩 속도가 빠르고 SEO에 최적화되어 있습니다.
        </p>
      </header>

      {/* 클라이언트 컴포넌트로 Promise 전달 (pending -> resovled or rejected) */}
      <Suspense fallback={<Spinner />}>
        <PokemonList pokemonsPromise={pokemonsPromise} />
      </Suspense>
    </section>
  )
}
