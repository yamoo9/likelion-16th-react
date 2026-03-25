import { fetchApi } from '@/utils'
import type { Pokemon } from './type'

// 환경 변수에서 포켓몬 데이터 서버의 기본 URL을 가져옵니다.
const POKEMON_API_URL = import.meta.env.VITE_POKEMON_API_URL

/**
 * [포켓몬 도감 API 서비스: pokemonApi]
 * 공공 데이터 성격의 포켓몬 목록 및 상세 정보를 서버로부터 가져옵니다.
 * 이 서비스는 로그인이 필요 없는 '공개 데이터'를 주로 다룹니다.
 */
export const pokemonApi = {
  
  /**
   * [전체 포켓몬 목록 조회: getAllPokemons]
   * - 도감에 표시될 모든 포켓몬 데이터를 한꺼번에 가져옵니다.
   * - 앱 초기 구동 시 호출되어 메모리(Context)에 캐싱되는 기초 데이터가 됩니다.
   */
  getAllPokemons: async (): Promise<Pokemon[]> => {
    // 인증 헤더(getAuthHeaders)가 필요 없는 공개 API 요청입니다.
    const response = await fetchApi<Pokemon[]>(`${POKEMON_API_URL}/pokemon`)
    
    // 서버 응답 객체에서 실제 데이터 배열만 추출하여 반환합니다.
    return response.data
  },

  /**
   * [특정 포켓몬 상세 정보 조회: getPokemonById]
   * - 특정 ID(또는 이름)에 해당하는 포켓몬 한 마리의 상세 정보를 가져옵니다.
   * - 상세 페이지나 컬렉션 추가 시 최신 정보를 확인할 때 사용됩니다.
   */
  getPokemonById: async (id: string): Promise<Pokemon> => {
    // URL 파라미터로 ID를 전달하여 특정 리소스를 요청합니다.
    const response = await fetchApi<Pokemon>(`${POKEMON_API_URL}/pokemon/${id}`)
    
    return response.data
  },
}