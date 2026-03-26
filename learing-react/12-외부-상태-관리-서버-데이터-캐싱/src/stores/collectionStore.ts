import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { 
  collectionApi, 
  pokemonApi, 
  type CollectionItem, 
  type Pokemon, 
  type PokemonType, 
  type TrainerInfo
} from '@/services/pokemon'
import { rankCount } from '@/config/trainer'
import useAuthStore from '@/stores/authStore' // authStore 임포트

type PokemonMap = Map<number, Pokemon>

/**
 * JSON.stringify는 Map 객체를 지원하지 않습니다.  
 * 로컬 스토리지 저장 시에는 [key, value][] 형태의 배열로 변환하여 저장하기 위한 타입입니다.  
 */
interface PersistedCollectionState {
  collection: CollectionItem[]
  allPokemons: [number, Pokemon][]
  collectionPokemons: [number, Pokemon][]
}

interface CollectionState {

  // 상태 (State)
  collection: CollectionItem[]
  collectionPokemons: PokemonMap // 내 포켓몬 상세 정보 캐시
  allPokemons: PokemonMap // 전체 도감 데이터 (마스터 데이터)
  isLoading: boolean

  // 액션 (Actions)
  initAllPokemons: () => Promise<void>
  loadUserCollection: () => Promise<void> // userId 인자 제거
  addToCollection: (pokemonId: number, nickname?: string) => Promise<void> // userId 인자 제거
  updateCollectionItem: (collectionItemId: string, updates: Partial<CollectionItem>) => Promise<void>
  removeFromCollection: (collectionItemId: string) => Promise<void>
  clearCollection: () => void

  // 유틸리티/계산 (Helpers)
  getFilteredCollection: (type: PokemonType | '전체') => CollectionItem[]
  getTrainerInfo: () => TrainerInfo
}

/**
 * 도감 데이터 로드, 사용자별 컬렉션 동기화 및 캐싱 로직을 전역에서 관리합니다.
 */
const useCollectionStore = create<CollectionState>()(
  devtools(
    persist(
      immer((set, get) => ({
        
        // --- 초기 상태 (Initial State) ---
        
        collection: [],
        collectionPokemons: new Map(),
        allPokemons: new Map(),
        isLoading: false,

        // --- 액션 함수들 (Actions) ---

        /**
         * 앱 실행 시 전체 도감 데이터를 한 번만 로드하여 메모리에 저장합니다.
         */
        initAllPokemons: async () => {
          if (get().allPokemons.size > 0) return // 이미 로드되었다면 중단

          try {
            const pokemons = await pokemonApi.getAllPokemons()
            const pokemonMap = new Map<number, Pokemon>()
            pokemons.forEach((p) => pokemonMap.set(Number(p.id), p))
            
            set((state) => {
              state.allPokemons = pokemonMap
            }, false, 'collection/initAllPokemons')
          } catch (error) {
            console.error('도감 데이터 로드 실패:', error)
          }
        },

        /**
         * 로그인한 사용자의 컬렉션을 가져오고 상세 정보를 매칭합니다.
         */
        loadUserCollection: async () => {
          const user = useAuthStore.getState().user
          if (!user) return

          set({ isLoading: true }, false, 'collection/loadUserCollectionStarted')
          
          try {
            const { allPokemons } = get()
            const userCollection = await collectionApi.getUserCollection(Number(user.id))
            
            // 전체 도감에서 상세 정보를 매칭하여 API 호출 최소화
            const newCollectionMap = new Map<number, Pokemon>()

            for (const item of userCollection) {
              const pId = Number(item.pokemonId)
              // 메모리에 있으면 사용하고, 없으면 개별 API 호출(폴백)
              const pData = allPokemons.get(pId) || await pokemonApi.getPokemonById(item.pokemonId)
              newCollectionMap.set(pId, pData)
            }

            set((state) => {
              state.collection = userCollection
              state.collectionPokemons = newCollectionMap
            }, false, 'collection/loadUserCollectionSuccess')
          } catch (error) {
            console.error('컬렉션 로드 실패:', error)
          } finally {
            set({ isLoading: false }, false, 'collection/loadUserCollectionEnded')
          }
        },

        /**
         * 포켓박스에 포켓몬 추가
         */
        addToCollection: async (pokemonId: number, nickname?: string) => {
          const user = useAuthStore.getState().user
          if (!user) {
            console.error('로그인이 필요한 서비스입니다.')
            return
          }

          set({ isLoading: true }, false, 'collection/addToCollectionStarted')
          try {
            const newItem = await collectionApi.addToCollection(Number(user.id), pokemonId, nickname)
            
            /**
             * [set 함수의 콜백 인자]
             * set((state) => { ... }) 에서 'state'는 현재 스토어에 저장된 최신 데이터를 의미합니다.
             * immer 덕분에 복잡한 Map/Array 수정도 불변성을 지키며 직관적으로 작성 가능합니다.
             */
            set((state) => {
              state.collection.push(newItem)
              
              // 상세 정보 캐시 업데이트
              if (!state.collectionPokemons.has(pokemonId)) {
                const pokemon = state.allPokemons.get(pokemonId)
                if (pokemon) state.collectionPokemons.set(pokemonId, pokemon)
              }
            }, false, 'collection/addToCollectionSuccess')
          } finally {
            set({ isLoading: false }, false, 'collection/addToCollectionEnded')
          }
        },

        /**
         * 포켓박스의 포켓몬 정보 수정
         */
        updateCollectionItem: async (collectionItemId: string, updates: Partial<CollectionItem>) => {
          set({ isLoading: true }, false, 'collection/updateCollectionItemStarted')

          try {
            const updatedItem = await collectionApi.updateCollectionItem(collectionItemId, updates)
            set((state) => {
              const idx = state.collection.findIndex(item => item.id === collectionItemId)
              if (idx !== -1) state.collection[idx] = updatedItem
            }, false, 'collection/updateCollectionItemSuccess')
          } finally {
            set({ isLoading: false }, false, 'collection/updateCollectionItemEnded')
          }
        },

        /**
         * 포켓박스에서 포켓몬 제거
         */
        removeFromCollection: async (collectionItemId: string) => {
          set({ isLoading: true }, false, 'collection/removeFromCollectionStarted')

          try {
            await collectionApi.removeFromCollection(collectionItemId)
            set((state) => {
              state.collection = state.collection.filter(item => item.id !== collectionItemId)
            }, false, 'collection/removeFromCollectionSuccess')
          } finally {
            set({ isLoading: false }, false, 'collection/removeFromCollectionEnded')
          }
        },

        /**
         * 로그아웃 시 초기화
         */
        clearCollection: () => {
          set({ collection: [], collectionPokemons: new Map() }, false, 'collection/clearCollection')
        },

        /**
         * 필터링 헬퍼
         */
        getFilteredCollection: (type: PokemonType | '전체') => {
          const { collection, collectionPokemons } = get()
          if (type === '전체') return collection
          
          return collection.filter((item) => {
            const pokemon = collectionPokemons.get(Number(item.pokemonId))
            return pokemon?.types.includes(type as PokemonType)
          })
        },

        /**
         * 정보 계산 헬퍼  
         * rankCount 설정을 기반으로 트레이너 등급을 계산합니다.
         */
        getTrainerInfo: () => {
          const count = get().collection.length
          if (count >= rankCount['베테랑']) return { rank: '베테랑', emoji: '🏆', collectionCount: count }
          if (count >= rankCount['루키']) return { rank: '루키', emoji: '🥈', collectionCount: count }
          return { rank: '초보', emoji: '🥉', collectionCount: count }
        },
      })),
      {
        name: 'pokemon-collection-storage',
        /**
         * Map 객체 직렬화 처리  
         * JSON.stringify는 Map을 지원하지 않으므로 배열 형태로 변환하여 저장합니다.  
         * 반환 타입을 PersistedCollectionState로 지정하여 'any' 사용을 피합니다.
         */
        partialize: (state): PersistedCollectionState => ({
          collection: state.collection,
          allPokemons: Array.from(state.allPokemons.entries()),
          collectionPokemons: Array.from(state.collectionPokemons.entries()),
        }),
        /**
         * 역직렬화 및 복구
         * 로컬 스토리지에서 읽어온 배열 데이터를 다시 Map 객체로 변환합니다.  
         * state의 타입을 unknown에서 실제 상태 타입으로 캐스팅하여 안전하게 접근합니다.  
         */
        onRehydrateStorage: () => (state) => {
          if (state) {
            const s = state as unknown as CollectionState

            if (Array.isArray(s.allPokemons)) {
              s.allPokemons = new Map(s.allPokemons)
            }
            
            if (Array.isArray(s.collectionPokemons)) {
              s.collectionPokemons = new Map(s.collectionPokemons)
            }
          }
        },
      },
    ),
    { name: 'CollectionStore' },
  ),
)

/**
 * 스토어의 모든 상태, 액션, 계산된 데이터를 한 번에 가져옵니다.  
 * 주로 관리자 페이지나 여러 데이터가 복합적으로 필요한 메인 대시보드에서 사용합니다.
 */
export const useCollectionStoreData = () => {
  return useCollectionStore(
    useShallow((state) => ({
      // 상태
      collection: state.collection,
      collectionPokemons: state.collectionPokemons,
      allPokemons: state.allPokemons,
      isLoading: state.isLoading,
      
      // 액션
      initAllPokemons: state.initAllPokemons,
      loadUserCollection: state.loadUserCollection,
      addToCollection: state.addToCollection,
      updateCollectionItem: state.updateCollectionItem,
      removeFromCollection: state.removeFromCollection,
      clearCollection: state.clearCollection,
      
      // 헬퍼/계산 (함수 실행 결과가 아닌 함수 자체를 반환)
      getFilteredCollection: state.getFilteredCollection,
      getTrainerInfo: state.getTrainerInfo,
    }))
  )
}

/**
 * 사용자의 포켓몬 리스트(ID, 닉네임 등)만 구독합니다.
 */
export const useCollection = () => useCollectionStore((state) => state.collection)

/**
 * 내 컬렉션에 포함된 포켓몬들의 상세 정보(Map)를 구독합니다.
 */
export const useCollectionPokemons = () => useCollectionStore((state) => state.collectionPokemons)

/**
 * 데이터 로딩 중 여부를 확인합니다.
 */
export const useCollectionLoading = () => useCollectionStore((state) => state.isLoading)

/**
 * 현재 컬렉션 수에 따른 트레이너 랭크 정보를 실시간으로 계산하여 반환합니다.
 * 
 * @example
 * const { rank, emoji, collectionCount } = useTrainerInfo()
 */
export const useTrainerInfo = () => {
  // 오직 collection의 길이(number)만 구독합니다. (참조값이 아닌 원시값이라 안전함)
  const count = useCollectionStore((state) => state.collection.length)

  // 계산 로직을 여기서 수행합니다.
  if (count >= rankCount['베테랑']) return { rank: '베테랑', emoji: '🏆', collectionCount: count }
  if (count >= rankCount['루키']) return { rank: '루키', emoji: '🥈', collectionCount: count }
  return { rank: '초보', emoji: '🥉', collectionCount: count }
}

/**
 * 특정 타입으로 필터링된 컬렉션 결과를 가져옵니다.
 * 
 * @example
 * const firePokemons = useFilteredCollection('불꽃')
 */
export const useFilteredCollection = (type: PokemonType | '전체') => {
  return useCollectionStore(
    useShallow((state) => state.getFilteredCollection(type))
  )
}

/**
 * 데이터를 조작하는 함수들만 모아서 반환합니다.
 */
export const useCollectionActions = () => {
  return useCollectionStore(
    useShallow((state) => ({
      initAllPokemons: state.initAllPokemons,
      loadUserCollection: state.loadUserCollection,
      addToCollection: state.addToCollection,
      updateCollectionItem: state.updateCollectionItem,
      removeFromCollection: state.removeFromCollection,
      clearCollection: state.clearCollection,
    }))
  )
}

export default useCollectionStore