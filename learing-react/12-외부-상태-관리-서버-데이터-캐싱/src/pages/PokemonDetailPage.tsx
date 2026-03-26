import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSuspenseQuery } from '@tanstack/react-query'

import { pokemonApi, type Pokemon } from '@/services/pokemon'
import { CollectionActions, ErrorState, PageLayout, PokemonInfo, Title } from '@/components'
import { useIsAuthenticated } from '@/stores/authStore'
import { useCollection, useCollectionActions } from '@/stores/collectionStore'

export default function PokemonDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const isAuthenticated = useIsAuthenticated()

  const collection = useCollection()
  const { addToCollection } = useCollectionActions()

  // 현재 포켓몬이 컬렉션에 있는지 확인
  const isInCollection = useMemo(
    () => collection.some((item) => item.pokemonId === id),
    [collection, id]
  )

  // id가 없으면 null 반환
  const queryKey = id ? ['pokemon', id] : null

  // React Query로 포켓몬 데이터 로드 (Suspense 사용)
  const { data: pokemon } = useSuspenseQuery<Pokemon, Error>({
    queryKey: queryKey!, // 쿼리 키
    queryFn: () => pokemonApi.getPokemonById(id!), // 포켓몬 데이터를 가져오는 함수
    retry: false, // 실패 시 재시도하지 않음
  })

  const handleAddToCollection = async (nickname: string) => {
    if (!id) return

    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/pokemon/${id}` } })
      return
    }

    await addToCollection(Number(id), nickname)
  }

  return queryKey ? (
    <PageLayout title="포켓몬 상세 정보">
      <Title>{pokemon.name}</Title>
      <PokemonInfo pokemon={pokemon} />
      <CollectionActions 
        isInCollection={isInCollection}
        onAddToCollection={handleAddToCollection}
      />
    </PageLayout>
  ) : (
    <ErrorState message="포켓몬 ID가 제공되지 않았습니다." />
  )
}
