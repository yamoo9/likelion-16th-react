'use client' // 클라이언트 컴포넌트 (Opt-in)

import { cn } from "@/utils"
import { useRouter, useSearchParams } from "next/navigation"

/* 이름순, 출판일순, ISBN순 정렬(오름차순,내림차순) 기능 구현 */
function SortOrder() {

  // 페이지 컴포넌트가 아닌, 클라이언트 컴포넌트에서
  // 상위(페이지) 컴포넌트의 props를 전달받지 않고 
  // 검색 매개변수(search params)를 가져오는 방법

  const router = useRouter()

  const searchParams = useSearchParams()
  const sortKey = searchParams.get('sortKey') ?? 'pubdate'
  const orderBy = searchParams.get('orderBy') ?? 'desc'

  return (
    <div className="flex gap-5 rounded-xl border border-slate-400 p-5">
      <button 
        type="button"
        onClick={() => {
          const searchParams = new URLSearchParams(window.location.search)
          const sortKey = searchParams.get('sortKey')
          const orderBy = searchParams.get('orderBy')
          if (sortKey === 'pubdate' && orderBy === 'asc') return
          router.push(`?sortKey=pubdate&orderBy=asc`)
        }}
        className={cn(
          'cursor-pointer',
          'text-foreground/70 hover:text-foreground',
          sortKey === 'pubdate' &&
            orderBy === 'asc' &&
            'font-black text-blue-600',
        )}
      >
        출판일 정렬 (오름차순)
      </button>
      <button
        type="button"
        onClick={() => {
          router.push('?sortKey=pubdate&orderBy=desc')
        }}
        className={cn(
          'cursor-pointer',
          'text-foreground/70 hover:text-foreground',
          sortKey === 'pubdate' &&
            orderBy === 'desc' &&
            'font-black text-blue-600',
        )}
      >
        출판일 정렬 (내림차순)
      </button>
    </div>
  )
}

export default SortOrder
