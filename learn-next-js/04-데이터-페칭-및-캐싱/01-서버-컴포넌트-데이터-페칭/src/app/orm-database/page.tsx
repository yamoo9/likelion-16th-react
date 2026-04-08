import { LucideServer } from 'lucide-react'

// Prisma Client 인스턴스 가져오기
import { prisma } from '@/lib/prisma'
import PostGrid, { UserData } from './post-grid'
import { unstable_cache } from 'next/cache'


const getCachedAllUsers = unstable_cache(async () => {
  return await prisma.user.findMany(
    {
      // 관계된 데이터 포함
      include: {
        posts: true
      }
    }
  ) as UserData[]
}, ['allUsers'], {
  revalidate: 3600 // 1시간 동안 기억하고, 다시 재검증
})


// React 서버 컴포넌트(RSC)
// - 비동기 함수로 설정
export default async function OrmAndDBPage() {

  // DB 또는 ORM을 통해 직접 데이터 페칭(가져오기)
  const allUsers = await getCachedAllUsers()

  return (
    <section className="m-6 space-y-6 md:mx-0">
      <header className="border-b border-b-slate-200 pb-4">
        <h1 className="flex items-center gap-2 text-2xl font-bold text-slate-800">
          <span className="h-8 w-1 rounded-full bg-blue-500" />
          <abbr
            className="cursor-help no-underline"
            title="Object-Relational Mapping"
          >
            ORM
          </abbr>{' '}
          데이터베이스
        </h1>
        <p className="mt-2 flex items-center gap-3 text-sm text-slate-500">
          <LucideServer className="size-4" />
          서버에서 데이터를 직접 조회하여 완성된 HTML을 전달하므로
          <br className="md:hidden" />
          초기 로딩 속도가 빠르고 SEO에 최적화되어 있습니다.
        </p>
      </header>

      <PostGrid data={allUsers} />

    </section>
  )
}
