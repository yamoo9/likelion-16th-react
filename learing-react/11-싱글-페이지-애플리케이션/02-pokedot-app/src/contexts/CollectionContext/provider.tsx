import { useEffect, useState, useCallback, useMemo } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { rankCount } from '@/config/trainer'
import {
  collectionApi,
  pokemonApi,
  type CollectionItem,
  type Pokemon,
  type PokemonType,
} from '@/services/pokemon'
import { CollectionContext } from './context'

type PokemonMap = Map<number, Pokemon>
type Props = React.PropsWithChildren

/**
 * [컬렉션 데이터 공급자: CollectionProvider]
 * 전역에서 포켓몬 컬렉션 상태를 관리하고, 관련 로직(추가/삭제/필터링)을 제공합니다.
 */
export function CollectionProvider({ children }: Props) {
  const { user, isAuthenticated } = useAuth()

  /* --- 상태 관리 (State) --- */
  const [collection, setCollection] = useState<CollectionItem[]>([]) // 내 포켓몬 목록
  const [collectionPokemons, setCollectionPokemons] = useState<PokemonMap>(new Map()) // 내 포켓몬의 상세 정보 캐시
  const [allPokemons, setAllPokemons] = useState<PokemonMap>(new Map()) // 전체 도감 데이터 (마스터 데이터)
  const [isLoading, setIsLoading] = useState(false)

  /* --- 초기 데이터 로드 (Initial Load) --- */
  // 앱 실행 시 전체 도감 데이터를 한 번만 로드하여 메모리에 저장합니다. (네트워크 비용 절감)
  useEffect(() => {
    const initData = async () => {
      try {
        const pokemons = await pokemonApi.getAllPokemons()
        const pokemonMap = new Map<number, Pokemon>()
        pokemons.forEach((p) => pokemonMap.set(Number(p.id), p))
        setAllPokemons(pokemonMap)
      } catch (error) {
        console.error('도감 데이터 로드 실패:', error)
      }
    }
    initData()
  }, [])

  /* --- 사용자별 컬렉션 동기화 (Sync User Collection) --- */
  // 로그인 상태나 도감 데이터가 준비되면 해당 사용자의 컬렉션을 가져옵니다.
  useEffect(() => {
    const loadUserCollection = async () => {
      // 가드 클로즈: 로그인이 안 되어 있거나 도감이 아직 없으면 초기화 후 중단
      if (!isAuthenticated || !user || allPokemons.size === 0) {
        if (!isAuthenticated || !user) {
          setCollection([])
          setCollectionPokemons(new Map())
        }
        return
      }

      setIsLoading(true)
      try {
        const userCollection = await collectionApi.getUserCollection(user.id)
        setCollection(userCollection)

        // [성능 최적화] 이미 로드된 전체 도감에서 상세 정보를 매칭하여 불필요한 API 호출 방지
        const newCollectionMap = new Map<number, Pokemon>()
        for (const item of userCollection) {
          const pId = Number(item.pokemonId)
          const pData = allPokemons.get(pId) || await pokemonApi.getPokemonById(item.pokemonId)
          newCollectionMap.set(pId, pData)
        }
        setCollectionPokemons(newCollectionMap)
      } catch (error) {
        console.error('컬렉션 로드 실패:', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadUserCollection()
  }, [user, isAuthenticated, allPokemons])

  /* --- 액션 함수 (Actions) --- */

  // [추가] 새로운 포켓몬을 잡았을 때 호출
  const addToCollection = useCallback(
    async (pokemonId: number, nickname?: string) => {
      if (!user) return
      setIsLoading(true)
      try {
        const newItem = await collectionApi.addToCollection(user.id, pokemonId, nickname)
        // 불변성 유지: 기존 배열을 복사하고 새 아이템 추가
        setCollection((prev) => [...prev, newItem])

        // 상세 정보 맵 업데이트
        if (!collectionPokemons.has(pokemonId)) {
          const pokemon = allPokemons.get(pokemonId) || await pokemonApi.getPokemonById(pokemonId.toString())
          setCollectionPokemons((prev) => new Map(prev).set(pokemonId, pokemon))
        }
      } finally {
        setIsLoading(false)
      }
    },
    [user, allPokemons, collectionPokemons],
  )

  // [수정] 별명 변경 등 정보 업데이트
  const updateCollectionItem = useCallback(
    async (collectionItemId: string, updates: Partial<CollectionItem>) => {
      setIsLoading(true)
      try {
        const updatedItem = await collectionApi.updateCollectionItem(collectionItemId, updates)
        setCollection((prev) =>
          prev.map((item) => (item.id === collectionItemId ? updatedItem : item))
        )
      } catch (error) {
        console.error('업데이트 실패:', error)
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    [],
  )

  // [삭제] 포켓몬을 놓아줄 때 호출
  const removeFromCollection = useCallback(async (collectionItemId: string) => {
    setIsLoading(true)
    try {
      await collectionApi.removeFromCollection(collectionItemId)
      setCollection((prev) => prev.filter((item) => item.id !== collectionItemId))
    } finally {
      setIsLoading(false)
    }
  }, [])

  /* --- 계산된 파생 상태 (Derived State) --- */

  // 속성별 필터링 로직
  const getFilteredCollection = useCallback(
    (type: PokemonType | '전체') => {
      if (type === '전체') return collection
      return collection.filter((item) => {
        const pokemon = collectionPokemons.get(Number(item.pokemonId))
        return pokemon?.types.includes(type as PokemonType)
      })
    },
    [collection, collectionPokemons],
  )

  // 트레이너 랭크 계산 (useMemo를 통한 최적화)
  const trainerInfo = useMemo(() => {
    const count = collection.length
    if (count >= rankCount['베테랑']) return { rank: '베테랑', emoji: '🏆', collectionCount: count }
    if (count >= rankCount['루키']) return { rank: '루키', emoji: '🥈', collectionCount: count }
    return { rank: '초보', emoji: '🥉', collectionCount: count }
  }, [collection.length])

  /* --- 컨텍스트 값 메모이제이션 (Value Memoization) --- */
  // 객체 리터럴의 참조 변화로 인한 불필요한 하위 컴포넌트 리렌더링 방지
  const value = useMemo(
    () => ({
      collection,
      collectionPokemons,
      isLoading,
      addToCollection,
      removeFromCollection,
      updateCollectionItem,
      getFilteredCollection,
      getTrainerInfo: () => trainerInfo,
    }),
    [
      collection,
      collectionPokemons,
      isLoading,
      addToCollection,
      removeFromCollection,
      getFilteredCollection,
      updateCollectionItem,
      trainerInfo,
    ],
  )

  return (
    <CollectionContext.Provider value={value}>
      {children}
    </CollectionContext.Provider>
  )
}