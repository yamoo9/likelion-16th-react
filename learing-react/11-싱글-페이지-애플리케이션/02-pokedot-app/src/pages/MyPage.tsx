import { useCallback, useState } from 'react'

import { CollectionGrid, LoadingState, PageLayout, Title, TrainerInfo, TypeFilter } from '@/components'
import { useCollection } from '@/contexts/CollectionContext'
import type { PokemonType } from '@/services/pokemon'
import { useAuth } from '@/contexts/AuthContext'

export default function MyPage() {
  /* 
    [사용자 인증 정보]
    - 현재 로그인한 사용자의 정보를 가져와 트레이너 프로필(이름 등)에 활용합니다.
  */
  const { user } = useAuth()

  /* 
    [나만의 컬렉션 데이터 및 기능]
    - collectionPokemons: 내가 수집한 포켓몬들의 상세 정보 목록입니다.
    - getFilteredCollection: 선택된 타입에 따라 내 수집 목록을 필터링해주는 함수입니다.
    - getTrainerInfo: 수집 현황을 바탕으로 랭크(등급)와 이모지 정보를 계산해줍니다.
  */
  const {
    collectionPokemons,
    isLoading,
    getFilteredCollection,
    getTrainerInfo,
    removeFromCollection,
    updateCollectionItem,
  } = useCollection()

  /* 
    [필터링 상태 관리]
    - 사용자가 선택한 포켓몬 타입(불꽃, 물, 전체 등)을 관리합니다.
  */
  const [selectedType, setSelectedType] = useState<PokemonType | '전체'>('전체')

  /* 
    [데이터 가공 (Derived State)]
    - 별도의 상태 저장 없이, 기존 데이터를 기반으로 화면에 필요한 정보를 즉석에서 계산합니다.
    - 이는 데이터의 일관성을 유지하는 아주 좋은 패턴입니다.
  */
  const filteredCollection = getFilteredCollection(selectedType)
  const { rank, emoji, collectionCount } = getTrainerInfo()

  /* 
    [성능 최적화: 타입 필터 변경 핸들러]
    - TypeFilter 컴포넌트에 프롭으로 전달되므로, 불필요한 리렌더링 방지를 위해 useCallback을 사용합니다.
  */
  const handleFilterChange = useCallback((type: PokemonType | '전체') => {
    setSelectedType(type)
  }, [])

  /* 
    [성능 최적화: 닉네임 수정 핸들러]
    - CollectionGrid 내의 개별 카드 컴포넌트까지 전달되는 함수입니다.
    - 비동기 작업(updateCollectionItem)을 포함하며, 참조 동일성을 유지하여 성능을 최적화합니다.
  */
  const handleUpdateNickname = useCallback(async (id: string, nickname: string) => {
    await updateCollectionItem(id, { nickname })
  }, [updateCollectionItem])

  // 데이터 로딩 중일 때의 화면 처리
  if (isLoading) {
    return <LoadingState message="포켓박스 로딩 중..." />
  }

  /* 
    [동적 메시지 설정]
    - 필터링 결과가 없을 때, 사용자가 어떤 상황인지 알 수 있도록 맞춤형 문구를 준비합니다.
  */
  const emptyMessage =
    selectedType === '전체'
      ? '아직 포켓박스에 추가된 포켓몬이 없습니다. 포켓몬을 수집해보세요!'
      : `${selectedType} 타입의 포켓몬이 컬렉션에 없습니다.`

  return (
    <PageLayout title="마이 포켓박스">
      <Title>마이 포켓박스</Title>
      
      {/* 트레이너 정보: 유저 ID와 수집 기반 랭크 표시 */}
      <TrainerInfo
        name={user?.id ?? ''}
        rank={rank}
        emoji={emoji}
        collectionCount={collectionCount}
      />

      {/* 타입 필터: 클릭 시 handleFilterChange를 통해 목록을 필터링 */}
      <TypeFilter
        onFilterChange={handleFilterChange}
        selectedType={selectedType}
      />

      {/* 컬렉션 그리드: 실제 포켓몬 목록 렌더링 및 수정/삭제 기능 연결 */}
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