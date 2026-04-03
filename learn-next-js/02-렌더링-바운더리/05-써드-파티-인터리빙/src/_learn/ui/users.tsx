import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'

import { cn } from '@/utils'
import { UserList } from './user-list'
import { getUsers } from '../api/users'

export default async function Users() {

  // 서버 컴포넌트
  // QueryClient를 사용(요청)할 때마다 생성
  const queryClient = new QueryClient()

  // 생성된 queryClient 객체를 사용해 API 서버에서 프리페칭(prefetch)
  await queryClient.prefetchQuery({
    queryKey: ['users'],
    queryFn: getUsers
  })

  // 클라이언트 측 queryClient에 보낼 프리페칭해 캐싱된 데이터를 압축
  const dehydratedState = dehydrate(queryClient)
  
  return (
    <section className="mx-auto max-w-md space-y-8 p-8">
      <header className="space-y-4">
        <h2
          className={cn(
            'text-3xl font-black tracking-tighter',
            'bg-linear-to-r from-slate-900 to-slate-500',
            'bg-clip-text text-transparent',
          )}
        >
          팀 매니저
        </h2>
        <p className="text-sm leading-relaxed text-slate-500">
          서버에서 미리 가져온 데이터(Prefetched Data)를 React Query에서
          관리하도록 구성해봅니다.
        </p>
      </header>

      <div
        className={cn(
          'rounded-3xl border border-slate-200 bg-white p-6',
          'shadow-[0_8px_30px_rgb(0,0,0,0.04)]',
        )}
      >
        <HydrationBoundary state={dehydratedState}>
          <UserList />
        </HydrationBoundary>
      </div>
    </section>
  )
}
