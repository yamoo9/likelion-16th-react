import { Pokemon } from '@/types/pokemon'
import useSWR from 'swr'

export function usePokemon(id: string) {
  return useSWR(
    `${process.env.NEXT_PUBLIC_MOCK_API_URL}/pokemon/${id}`,
    async (url: string): Promise<Pokemon[]> => {
      return fetch(url).then((r) => r.json())
    },
  )
}

export function useAllPokemons(id: string | undefined = undefined) {
  return useSWR(
    `${process.env.NEXT_PUBLIC_MOCK_API_URL}/pokemon${id ? `/${id}` : ''}`,
    async (url: string): Promise<Pokemon[]> => {
      return fetch(url).then((r) => r.json())
    },
  )
}
