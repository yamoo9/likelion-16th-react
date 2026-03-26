import { useEffect, useState } from 'react'

import type { PokemonType } from '@/services/pokemon'
import { useAuthUser } from '@/stores/authStore'
import {
  useCollectionActions,
  useCollectionLoading,
  useCollectionPokemons,
  useFilteredCollection,
  useTrainerInfo,
} from '@/stores/collectionStore'
import {
  CollectionGrid,
  LoadingState,
  PageLayout,
  Title,
  TrainerInfo,
  TypeFilter,
} from '@/components'


export default function MyPage() {
  const user = useAuthUser()

  const isLoading = useCollectionLoading()
  const collectionPokemons = useCollectionPokemons()
  const { removeFromCollection, updateCollectionItem, loadUserCollection } = useCollectionActions()

  const [selectedType, setSelectedType] = useState<PokemonType | '전체'>('전체')
  const filteredCollection = useFilteredCollection(selectedType)

  useEffect(() => {
    if (user) {
      loadUserCollection()
    }
  }, [user, loadUserCollection])

  const trainerInfo = useTrainerInfo()
  const { rank, emoji, collectionCount } = trainerInfo

  const handleFilterChange = (type: PokemonType | '전체') => {
    setSelectedType(type)
  }

  const handleUpdateNickname = async (id: string, nickname: string) => {
    await updateCollectionItem(id, { nickname })
  }

  if (isLoading) {
    return <LoadingState message="포켓박스 로딩 중..." />
  }

  const emptyMessage =
    selectedType === '전체'
      ? '아직 포켓박스에 추가된 포켓몬이 없습니다. 포켓몬을 수집해보세요!'
      : `${selectedType} 타입의 포켓몬이 컬렉션에 없습니다.`

  return (
    <PageLayout title="마이 포켓박스">
      <Title>마이 포켓박스</Title>
      <TrainerInfo
        name={user?.id ?? ''}
        rank={rank}
        emoji={emoji}
        collectionCount={collectionCount}
      />

      <TypeFilter
        onFilterChange={handleFilterChange}
        selectedType={selectedType}
      />

      <CollectionGrid
        collection={filteredCollection}
        pokemons={collectionPokemons}
        onUpdateNickname={handleUpdateNickname}
        onRemove={removeFromCollection}
        emptyMessage={emptyMessage}
      />
    </PageLayout>
  )
}
