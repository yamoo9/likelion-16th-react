'use client'

import { LucideInfo, LucideMousePointer2 } from 'lucide-react'

import { Spinner } from '@/components/ui/spinner'
import { usePokemons } from './_resources/use-pokemons'
import { PokemonSkeleton } from './_resources/pokemon-skeleton'
import { PokemonList } from './_resources/pokemon-list'
import { PrintError } from './_resources/print-error'

export default function ClientComponentPage() {
  const { isLoading, pokemons, error } = usePokemons()

  // 페이지 전체 로딩 처리
  if (isLoading) return <Spinner>포켓몬 데이터 로딩 중...</Spinner>

  return (
    <section className="m-6 space-y-6 md:mx-0">
      <header className="border-b border-b-slate-200 pb-4">
        <h1 className="flex items-center gap-2 text-2xl font-bold text-slate-800">
          <LucideMousePointer2 className="h-6 w-6 text-blue-500" />
          클라이언트 사이드 데이터 페칭
        </h1>
        <p className="mt-2 flex items-center gap-1 text-sm text-slate-500">
          <LucideInfo className="h-4 w-4" />
          브라우저 마운트 후 데이터를 호출하며, 로딩 및 에러 상태를 직접 관리합니다.
        </p>
      </header>

      {/* 상태에 따른 조건부 렌더링 */}
      <div className="min-h-100">
        {isLoading ? (
          <PokemonSkeleton count={6} />
        ) : error ? (
          <PrintError message={error.message} />
        ) : (
          pokemons && <PokemonList data={pokemons} />
        )}
      </div>
    </section>
  )
}