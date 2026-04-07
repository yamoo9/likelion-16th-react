'use client'

import { LucideMousePointer2 } from 'lucide-react'

import { PokemonList } from '@/components/ui/pokemon-list'
import { PrintError } from '@/components/ui/print-error'
import { Spinner } from '@/components/ui/spinner'

import { useAllPokemons } from './_backup/utils/pokemons'


export default function ClientSidePage() {
  const { data, error, isLoading } = useAllPokemons()

  if (isLoading) {
    return <Spinner>포켓몬 데이터를 불러오는 중...</Spinner>
  }

  if (error) {
    return <PrintError message={error.message} />
  }

  return (
    <section className="m-6 space-y-6 md:mx-0">
      <header className="border-b border-b-slate-200 pb-4">
        <h1 className="flex items-center gap-2 text-2xl font-bold text-slate-800">
          <span className="h-8 w-1 rounded-full bg-blue-500" />
          클라이언트 사이드 데이터 페칭
        </h1>
        <p className="mt-2 flex items-center gap-3 text-sm text-slate-500">
          <LucideMousePointer2 className="size-5" />
          브라우저 마운트 후 데이터를 호출하며, 로딩 및
          <br className="md:hidden" />
          에러 상태를 컴포넌트 내부에서 실시간으로 제어합니다.
        </p>
      </header>
      {data && <PokemonList data={data} />}
    </section>
  )
}
