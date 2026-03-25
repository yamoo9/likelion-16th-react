import { useCallback, useEffect, useState } from 'react'

import { ErrorState, LoadingState, PageLayout, PokemonGrid, PokemonSearch } from '@/components'
import { pokemonApi, type Pokemon } from '@/services/pokemon'


export default function HomePage() {
  /* 
    [URL 상태 관리]
    - 브라우저 주소창의 쿼리 파라미터(?q=...) 정보를 가져옵니다.
    - 현재는 초기 설정을 위해 undefined로 두었으나, 실제 구현 시 useSearchParams를 사용합니다.
    - 참고: https://reactrouter.com/api/hooks/useSearchParams#usesearchparams
  */
  const searchParams = undefined
  console.log(searchParams)

  // URL에서 추출한 검색어(q)를 저장하는 변수입니다.
  const searchQuery = ''

  /* 
    [데이터 상태 관리]
    - pokemons: 서버에서 받아온 전체 포켓몬 원본 목록입니다.
    - filteredPokemons: 검색 조건에 맞춰 필터링되어 실제 화면에 그려질 목록입니다.
    - loading/error: 데이터를 불러오는 중이거나 실패했을 때의 상태를 관리합니다.
  */
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  /* 
    [초기 데이터 로드]
    - 컴포넌트가 처음 렌더링될 때 API를 호출하여 전체 포켓몬 데이터를 가져옵니다.
    - 성공 시 원본 데이터와 필터링용 데이터 모두에 저장합니다.
  */
  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setLoading(true)
        const data = await pokemonApi.getAllPokemons()
        setPokemons(data)
        setFilteredPokemons(data)
      } catch (err) {
        setError('포켓몬 목록을 불러오는 데 실패했습니다.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchPokemons()
  }, [])

  /* 
    [필터링 로직]
    - 입력받은 검색어(query)를 바탕으로 이름이나 도감 번호가 일치하는 포켓몬을 찾습니다.
    - 원본 데이터(pokemons)가 변경될 때만 함수를 새로 생성하도록 최적화되었습니다.
  */
  const filterPokemons = useCallback(
    (query: string) => {
      
      // 검색어가 비어있으면 전체 목록을 보여줍니다.
      if (!query.trim()) {
        setFilteredPokemons(pokemons)
        return
      }

      // 대소문자 구분 없이 이름이 포함되거나, ID가 포함된 포켓몬만 골라냅니다.
      const filtered = pokemons.filter(
        (pokemon) =>
          pokemon.name.toLowerCase().includes(query.toLowerCase()) ||
          pokemon.id.toString().includes(query),
      )
      setFilteredPokemons(filtered)
    },
    [pokemons],
  )

  /* 
    [검색 이벤트 핸들러]
    - 검색창 컴포넌트에서 사용자가 입력을 마쳤을 때 호출되어 필터링을 실행합니다.
    - 자식 컴포넌트에 전달되는 함수이므로 성능 최적화를 위해 useCallback으로 감쌉니다.
  */
  const handleSearch = useCallback((searchTerm: string) => {
    filterPokemons(searchTerm)
  }, [filterPokemons])

  /* 
    [URL 동기화]
    - 주소창의 검색어(searchQuery)가 변경될 때마다 화면의 목록을 자동으로 필터링합니다.
    - 뒤로가기나 앞으로가기 시에도 검색 결과가 유지되도록 돕습니다.
  */
  useEffect(() => {
    if (pokemons.length > 0) {
      filterPokemons(searchQuery)
    }
  }, [searchQuery, pokemons, filterPokemons])

  // 로딩 중일 때 보여줄 화면
  if (loading) {
    return <LoadingState message="포켓몬 리스트 로딩 중..." />
  }

  // 에러 발생 시 보여줄 화면
  if (error) {
    return <ErrorState message={error} />
  }

  return (
    <PageLayout
      title="포켓몬 도감"
      subtitle="모든 포켓몬을 탐색하고 컬렉션에 추가해보세요!"
    >
      {/* 검색 입력창 */}
      <PokemonSearch onSearch={handleSearch} />

      {/* 검색 결과가 있을 때와 없을 때를 구분하여 렌더링 */}
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
