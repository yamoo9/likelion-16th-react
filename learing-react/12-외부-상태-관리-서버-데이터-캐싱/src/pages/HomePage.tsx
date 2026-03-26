import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSuspenseQuery } from '@tanstack/react-query'

import { PageLayout, PokemonGrid, PokemonSearch } from '@/components'
import { pokemonApi, type Pokemon } from '@/services/pokemon'

export default function HomePage() {
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('q') || ''

  // React Query를 사용하여 포켓몬 데이터를 로드
  const { data: pokemons } = useSuspenseQuery<Pokemon[]>({
    queryKey: ['pokemons'], // 쿼리 키
    queryFn: pokemonApi.getAllPokemons, // 포켓몬 데이터를 가져오는 함수
    staleTime: 1000 * 60 * 5, // 데이터를 5분 동안 캐싱
  })

  // 필터링된 포켓몬 데이터를 useMemo로 캐싱
  const filteredPokemons = useMemo(() => {
    if (!pokemons || pokemons.length === 0) return []

    return pokemons.filter(
      (pokemon) =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pokemon.id.toString().includes(searchQuery)
    )
  }, [searchQuery, pokemons])

  return (
    <PageLayout
      title="포켓몬 도감"
      subtitle="모든 포켓몬을 탐색하고 컬렉션에 추가해보세요!"
    >
      <PokemonSearch onSearch={(searchTerm) => {
        // 검색어가 변경되면 URL 쿼리 파라미터를 업데이트
        const params = new URLSearchParams(searchParams)
        params.set('q', searchTerm)
        window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`)
      }} />
      {filteredPokemons.length > 0 ? (
        <PokemonGrid pokemons={filteredPokemons} />
      ) : (
        <div role="status" className="no-results">
          검색 결과가 없습니다.
        </div>
      )}
    </PageLayout>
  )
}
