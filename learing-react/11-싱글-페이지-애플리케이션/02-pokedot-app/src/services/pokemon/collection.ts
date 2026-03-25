import { fetchApi } from '@/utils'
import { collectionStorageType } from '@/config/collection'
import type { CollectionItem } from './type'

const COLLECTION_API_URL = import.meta.env.VITE_COLLECTION_API_URL
const LOCAL_COLLECTION_KEY = import.meta.env.VITE_LOCAL_COLLECTION_KEY

// 로컬 스토리지에서 전체 데이터 읽기 (역직렬화: String -> Object)
const getLocalCollection = (): CollectionItem[] => {
  const collection = localStorage.getItem(LOCAL_COLLECTION_KEY)
  return collection ? JSON.parse(collection) : []
}

// 로컬 스토리지에 데이터 저장하기 (직렬화: Object -> String)
const saveLocalCollection = (collection: CollectionItem[]) => {
  localStorage.setItem(LOCAL_COLLECTION_KEY, JSON.stringify(collection))
}

// 고유 ID 생성 (서버가 없을 때 임시로 사용할 랜덤 ID 생성기)
const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

/**
 * [포켓몬 컬렉션 API 서비스]
 * collectionStorageType 설정에 따라 '로컬 모드'와 '서버 모드'로 자동 전환됩니다.
 */
export const collectionApi = {
  
  // [조회] 특정 사용자의 포켓몬 컬렉션 목록 가져오기
  getUserCollection: async (userId: number): Promise<CollectionItem[]> => {
    if (collectionStorageType === 'localStorage') {
      // 로컬 모드: 전체 데이터 중 해당 유저의 아이템만 필터링
      const collection = getLocalCollection()
      return collection.filter((item) => item.userId === userId.toString())
    } else {
      // 서버 모드: 실제 API 호출
      const response = await fetchApi<CollectionItem[]>(
        `${COLLECTION_API_URL}/users/${userId}/collection`,
      )
      return response.data
    }
  },

  // [추가] 내 컬렉션에 새로운 포켓몬 등록하기
  addToCollection: async (
    userId: number,
    pokemonId: number,
    nickname?: string,
  ): Promise<CollectionItem> => {
    if (collectionStorageType === 'localStorage') {
      const collection = getLocalCollection()
      const newItem: CollectionItem = {
        id: generateUniqueId(),
        userId: userId.toString(),
        pokemonId: pokemonId.toString(),
        addedAt: new Date().toISOString(),
        nickname,
      }

      collection.push(newItem)
      saveLocalCollection(collection)
      return newItem
    } else {
      const response = await fetchApi<CollectionItem>(
        `${COLLECTION_API_URL}/users/${userId}/collection`,
        {
          method: 'POST',
          body: JSON.stringify({ pokemonId, nickname }),
        },
      )
      return response.data
    }
  },

  // [수정] 닉네임 변경 등 컬렉션 아이템 정보 업데이트
  updateCollectionItem: async (
    collectionItemId: string,
    updates: Partial<CollectionItem>,
  ): Promise<CollectionItem> => {
    if (collectionStorageType === 'localStorage') {
      const collection = getLocalCollection()
      const itemIndex = collection.findIndex(
        (item) => item.id === collectionItemId,
      )

      if (itemIndex === -1) {
        throw new Error('컬렉션 아이템을 찾을 수 없습니다')
      }

      // 기존 데이터에 변경된 부분만 덮어쓰기 (Spread Operator)
      const updatedItem = { ...collection[itemIndex], ...updates }
      collection[itemIndex] = updatedItem
      saveLocalCollection(collection)
      return updatedItem
    } else {
      const response = await fetchApi<CollectionItem>(
        `${COLLECTION_API_URL}/collection/${collectionItemId}`,
        {
          method: 'PATCH',
          body: JSON.stringify(updates),
        },
      )
      return response.data
    }
  },

   // [삭제] 컬렉션에서 특정 아이템 제거하기
  removeFromCollection: async (collectionItemId: string): Promise<void> => {
    if (collectionStorageType === 'localStorage') {
      const collection = getLocalCollection()
      // 삭제 대상을 제외한 나머지만 남김
      const updatedCollection = collection.filter(
        (item) => item.id !== collectionItemId,
      )
      saveLocalCollection(updatedCollection)
    } else {
      await fetchApi<void>(
        `${COLLECTION_API_URL}/collection/${collectionItemId}`,
        {
          method: 'DELETE',
        },
      )
    }
  }
}