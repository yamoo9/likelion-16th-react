'use client'

import { useEffect, useState } from 'react'
import { LucideMousePointer2 } from 'lucide-react'

import { type Pokemon } from '@/types/pokemon'
import { PokemonList } from '@/components/ui/pokemon-list'
import { PrintError } from '@/components/ui/print-error'
import { Spinner } from '@/components/ui/spinner'
import { isErrorObject } from '@/utils'

// 클라이언트 측 데이터 페칭: SWR 라이브러리 (Vercel)

export default function ClientSidePage() {
  
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

  if (isLoading) {
    return <Spinner>포켓몬 데이터를 불러오는 중...</Spinner>
  }

  if (error) {
    return <PrintError message={error.message} />
  }

  return (
    <section className="m-6 space-y-6 md:mx-0">
      <header className="border-b border-b-slate-200 pb-4">
        <h1 className="flex items-center gap-2 text-2xl font-bold text-slate-800">
          <span className="h-8 w-1 rounded-full bg-blue-500" />
          클라이언트 사이드 데이터 페칭
        </h1>
        <p className="mt-2 flex items-center gap-3 text-sm text-slate-500">
          <LucideMousePointer2 className="size-5" />
          브라우저 마운트 후 데이터를 호출하며, 로딩 및<br className='md:hidden' />
          에러 상태를 컴포넌트 내부에서 실시간으로 제어합니다.
        </p>
      </header>
      {data && <PokemonList data={data} />}
    </section>
  )
}
