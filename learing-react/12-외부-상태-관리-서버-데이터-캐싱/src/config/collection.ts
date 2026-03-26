/**
 * [컬렉션 저장 방식 타입: CollectionStorageType]
 * 데이터의 영속성(Persistence)을 어디에 둘 것인지 결정하는 타입 정의입니다.
 * 
 * - 'api': 실제 백엔드 서버와 통신하여 DB에 저장 (상용/운영 환경)
 * - 'localStorage': 브라우저 저장소에 저장 (개발/프로토타입 환경)
 */
export type CollectionStorageType = 'api' | 'localStorage'

/**
 * [현재 스토리지 모드 설정: collectionStorageType]
 * 앱 전체에서 데이터를 어디서 읽고 쓸지 결정하는 '마스터 스위치'입니다.
 * 
 * @default 'localStorage' 
 * - 서버 연동 없이도 로컬에서 포켓몬 수집 기능을 테스트할 수 있도록 초기 설정되어 있습니다.
 * - 서버 API가 준비되면 이 값을 'api'로 변경하기만 하면 됩니다.
 */
export const collectionStorageType: CollectionStorageType = 'localStorage'