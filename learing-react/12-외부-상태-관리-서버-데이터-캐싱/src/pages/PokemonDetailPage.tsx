import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { pokemonApi, type Pokemon } from '@/services/pokemon'
import { CollectionActions, ErrorState, LoadingState, PageLayout, PokemonInfo, Title } from '@/components'
import { useIsAuthenticated } from '@/stores/authStore'
import { useCollection, useCollectionActions, useCollectionLoading } from '@/stores/collectionStore'

export default function PokemonDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  
  const isAuthenticated = useIsAuthenticated()
  
  const collection = useCollection()
  const isCollectionLoading = useCollectionLoading()
  const { addToCollection } = useCollectionActions()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pokemon, setPokemon] = useState<Pokemon | null>(null)


  // 현재 포켓몬이 컬렉션에 있는지 확인
  const isInCollection = collection.some(
    (item) => item.pokemonId === id,
  )

  useEffect(() => {
    if (!id) return

    const fetchPokemon = async () => {
      try {
        setLoading(true)
        const data = await pokemonApi.getPokemonById(id)
        setPokemon(data)
      } catch (err) {
        setError('포켓몬 정보를 불러오는 데 실패했습니다.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchPokemon()
  }, [id])

  const handleAddToCollection = async (nickname: string) => {
    if (!id) return

    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/pokemon/${id}` } })
      return
    }

    await addToCollection(Number(id), nickname)
  }

  if (loading) {
    return <LoadingState message="포켓몬 정보 로딩 중..." />
  }

  if (error || !pokemon) {
    return <ErrorState message={error || '포켓몬을 찾을 수 없습니다.'} />
  }

  return (
    <PageLayout title="포켓몬 상세 정보">
      <Title>{pokemon.name}</Title>
      <PokemonInfo pokemon={pokemon} />
      <CollectionActions 
        isInCollection={isInCollection}
        isLoading={isCollectionLoading}
        onAddToCollection={handleAddToCollection}
      />
    </PageLayout>
  )
}