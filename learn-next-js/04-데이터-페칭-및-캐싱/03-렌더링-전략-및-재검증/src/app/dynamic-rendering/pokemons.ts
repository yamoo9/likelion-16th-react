import type { Pokemon } from '@/types/pokemon'
import { cache } from 'react'
import 'server-only'

export const getCachedPokemons = cache(async (): Promise<Pokemon[]> => {
  const response = await fetch(`${process.env.MOCK_API_URL}/pokemon`) // 매번 요청할 때마다 데이터 페칭
  if (!response.ok) throw new Error('데이터를 불러오는데 실패했습니다.')
  const pokemons = (await response.json())
  return pokemons
})