/* eslint-disable @typescript-eslint/no-unused-vars */

import { useEffect, useState } from 'react'

import { CollectionActions, ErrorState, LoadingState, PageLayout, PokemonInfo, Title } from '@/components'
import { pokemonApi, type Pokemon } from '@/services/pokemon'
import { useCollection } from '@/contexts/CollectionContext'
import { useAuth } from '@/contexts/AuthContext'

export default function PokemonDetailPage() {
  /* 
    [URL 파라미터 추출]
    - useParams: URL 경로에 포함된 동적 파라미터(예: /pokemon/:id)를 가져옵니다.
    - 여기서는 포켓몬의 고유 ID를 받아와서 해당 데이터를 조회하는 키로 사용합니다.
    - 참고: https://reactrouter.com/api/hooks/useParams
  */
  const { id } = { id: '1' }
  
  /* 
    [프로그래밍 방식 이동]
    - useNavigate: 특정 로직(예: 로그인 체크) 실행 후 페이지를 이동시킬 때 사용합니다.
    - https://reactrouter.com/api/hooks/useNavigate
  */
  const navigate = undefined

  const [pokemon, setPokemon] = useState<Pokemon | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { isAuthenticated } = useAuth()
  const {
    collection,
    addToCollection,
    isLoading: collectionLoading,
  } = useCollection()

  // 현재 상세 페이지의 포켓몬이 내 컬렉션에 이미 존재하는지 확인
  const isInCollection = collection.some(
    (item) => item.pokemonId === id,
  )

  /* 
    [데이터 페칭 로직]
    - URL 파라미터인 'id'가 변경될 때마다 새로운 포켓몬 정보를 서버에서 가져옵니다.
  */
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

  /* 
    [인증 기반 페이지 이동 제어]
    - 로그인하지 않은 사용자가 '컬렉션 추가'를 시도하면 로그인 페이지로 보냅니다.
    - state: { from: ... }를 통해 로그인 성공 후 다시 이 상세 페이지로 돌아올 수 있게 경로를 전달합니다.
  */
  const handleAddToCollection = async (nickname: string) => {
    if (!id) return

    if (!isAuthenticated) {
      // 로그인 후 다시 이 페이지로 돌아오도록 현재 경로를 state에 담아 보냅니다.
      // - navigate 함수 코드 작성
      // - 이동 경로: `/login`
      // - 돌아올 경로: `/pokemon/${id}` (`state.from`으로 설정)

      return
    }

    await addToCollection(Number(id), nickname || undefined)
  }

  // 로딩 및 에러 처리 (조건부 렌더링)
  if (loading) {
    return <LoadingState message="포켓몬 정보 로딩 중..." />
  }

  if (error || !pokemon) {
    return <ErrorState message={error || '포켓몬을 찾을 수 없습니다.'} />
  }

  return (
    <PageLayout title="포켓몬 상세 정보">
      <Title>{pokemon.name}</Title>
      
      {/* 포켓몬 상세 능력치 및 이미지 표시 */}
      <PokemonInfo pokemon={pokemon} />
      
      {/* 
        [컴포넌트 간 데이터 전달]
        - 컬렉션 상태(추가됨 여부, 로딩 상태)와 추가 실행 함수를 전달합니다.
      */}
      <CollectionActions 
        isInCollection={isInCollection}
        isLoading={collectionLoading}
        onAddToCollection={handleAddToCollection}
      />
    </PageLayout>
  )
}