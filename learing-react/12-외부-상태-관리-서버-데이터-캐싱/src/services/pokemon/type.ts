/**
 * [포켓몬 속성 타입: PokemonType]
 * 포켓몬이 가질 수 있는 모든 속성을 정의합니다.
 * 유니온 타입을 통해 잘못된 속성 값이 들어오는 것을 방지합니다.
 */
export type PokemonType = 
  | '불꽃' | '물' | '풀' | '전기' | '노말' | '비행' | '독' | '땅' 
  | '에스퍼' | '벌레' | '바위' | '격투' | '고스트' | '얼음' | '드래곤' | '강철' | '페어리'

/**
 * [트레이너 등급: TrainerRank]
 * 사용자의 활동 수준에 따른 등급입니다.
 */
export type TrainerRank = '초보' | '루키' | '베테랑'

/**
 * [포켓몬 상세 정보: Pokemon]
 * 도감(Pokedex)에 표시될 포켓몬의 전체 데이터 구조입니다.
 */
export interface Pokemon {
  id: string            // 포켓몬 번호 (예: "1")
  name: string          // 이름 (예: "이상해씨")
  types: string[]       // 속성 배열 (예: ["풀", "독"]) -> [string]은 요소가 1개인 튜플이므로 string[] 권장
  genus: string         // 분류 (예: "씨앗포켓몬")
  description: string   // 도감 설명
  height: number        // 키 (m)
  weight: number        // 몸무게 (kg)
  abilities: string[]   // 특성 배열 (예: ["심록", "엽록소"])
  gender: string        // 성별 비율 정보
  image: string         // 이미지 URL
}

/**
 * [내 컬렉션 아이템: CollectionItem]
 * 사용자가 포획(수집)한 포켓몬의 정보입니다.
 * 어떤 사용자가(userId), 어떤 포켓몬을(pokemonId), 언제(addedAt) 잡았는지 기록합니다.
 */
export interface CollectionItem {
  id: string            // 컬렉션 고유 ID (포켓몬 ID와 별개)
  userId: string        // 소유자 ID
  pokemonId: string     // 포켓몬 도감 번호
  addedAt: string       // 수집 일시 (ISO 8601 형식)
  nickname?: string     // [선택] 사용자가 지어준 별명
}

/**
 * [트레이너 통계 정보: TrainerInfo]
 * 마이페이지 등에서 보여줄 사용자의 요약 정보입니다.
 */
export interface TrainerInfo {
  rank: TrainerRank     // 현재 등급
  emoji: string         // 등급별 아이콘 (예: "🐣", "🥈", "🏆")
  collectionCount: number // 총 수집한 포켓몬 수
}