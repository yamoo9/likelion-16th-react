import { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import { ErrorState, PageLayout, PokemonGrid, PokemonSearch } from '@/components'
import { pokemonApi, type Pokemon } from '@/services/pokemon'

export default function HomePage() {
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('q') || ''

  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [error, setError] = useState<string | null>(null)

  // 포켓몬 데이터 로드
  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const data = await pokemonApi.getAllPokemons()
        setPokemons(data)
      } catch (err) {
        setError('포켓몬 목록을 불러오는 데 실패했습니다.')
        console.error(err)
      }
    }

    fetchPokemons()
  }, [])

  // 필터링된 포켓몬 데이터를 useMemo로 캐싱
  const filteredPokemons = useMemo(() => {
    if (!pokemons.length) return []

    return pokemons.filter(
      (pokemon) =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pokemon.id.toString().includes(searchQuery)
    )
  }, [searchQuery, pokemons])

  if (error) {
    return <ErrorState message={error} />
  }

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
