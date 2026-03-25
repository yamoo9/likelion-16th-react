import { createContext, use } from "react"

/**
 * [컬렉션 컨텍스트 타입: CollectionContextType]
 * 앱 전체에서 공유될 포켓몬 컬렉션 관련 데이터와 함수들의 설계도입니다.
 */
interface CollectionContextType {
  // 상태 (Data)
  collection: CollectionItem[]             // 사용자가 잡은 포켓몬 목록 (중복 가능)
  collectionPokemons: Map<number, Pokemon> // 컬렉션에 포함된 포켓몬의 상세 정보 (ID 기반 매핑)
  isLoading: boolean                       // 데이터 로딩 상태 (스피너 표시 등에 활용)

  // 액션 (Functions)
  addToCollection: (pokemonId: number, nickname?: string) => Promise<void> // 포켓몬 포획
  removeFromCollection: (collectionItemId: string) => Promise<void>        // 포켓몬 놓아주기
  updateCollectionItem: (                                                  // 별명 수정 등 정보 업데이트
    collectionItemId: string,
    updates: Partial<CollectionItem>,
  ) => Promise<void>
  
  // 유틸리티 (Helpers)
  getFilteredCollection: (type: PokemonType | '전체') => CollectionItem[]         // 속성별 필터링 결과 반환
  getTrainerInfo: () => { rank: string; emoji: string; collectionCount: number } // 트레이너 랭크 정보 계산
}

/**
 * [컨텍스트 생성: CollectionContext]
 * 데이터를 담을 '바구니'를 만듭니다. 초기값은 null로 설정합니다.
 */
export const CollectionContext = createContext<CollectionContextType | null>(null)

/**
 * [커스텀 훅: useCollection]
 * 컴포넌트에서 컬렉션 데이터에 쉽게 접근하기 위해 사용하는 전용 훅입니다.
 * 
 * @example
 * const { collection, addToCollection } = useCollection();
 */
export const useCollection = (): CollectionContextType => {
  // React 19의 새로운 'use' API를 사용하여 컨텍스트를 구독합니다.
  const context = use(CollectionContext)

  // Provider 밖에서 사용했을 때의 에러 처리를 통해 개발자의 실수를 방지합니다.
  if (!context) {
    throw new Error(
      'useCollection 훅은 CollectionProvider 안에서만 사용할 수 있습니다.',
    )
  }

  return context
}