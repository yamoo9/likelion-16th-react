import { useEffect, useState } from "react"
import { Pokemon } from "@/types/pokemon"
import { isErrorObject } from "@/utils"

export const usePokemons = () => {
  const [data, setData] = useState<Pokemon[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller

    const fetchData = async () => {
      try {
        setIsLoading(true)

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_MOCK_API_URL}/pokemon`,
          { signal },
        )

        if (!response.ok) {
          throw new Error('데이터를 불러오는데 실패했습니다.')
        }

        const result = (await response.json()) as Pokemon[]
        setData(result)
        setError(null)
      } catch (error) {
        if (isErrorObject(error)) {
          if (error.name === 'AbortError') return
          setError(
            error instanceof Error ? error : new Error('알 수 없는 에러 발생'),
          )
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()

    return () => controller.abort()
  }, [])

  return {
    isLoading,
    pokemons: data,
    error,
  }
}