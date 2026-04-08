import { Spinner } from '@/components/ui/spinner'
import UserList from './user-list'
import { Suspense } from 'react'

export default function RemindStreamingPage() {
  // 서버 컴포넌트에서 데이터 페칭 (단, Promise를 resolve 하지 않음. 즉, await 안함)
  const usersPromise = fetch(
    'https://koreandummyjson.vercel.app/api/users?page=1&limit=30',
  ).then((response) => response.json()) // [중요!] 직렬화 (serialization)

  return (
    <section className="m-8">
      <h1 className="text-2xl font-medium text-blue-600">
        서버에서 클라이언트로 데이터 스트리밍하기
      </h1>
      {/* 데이터 스트리밍하는 동안 대체 UI 제공 */}
      <Suspense
        fallback={
          <Spinner>사용자 목록 로딩 중...</Spinner>
          // <div role="status" aria-live="polite">사용자 목록 로딩 중...</div>
        }
        >
        {/* 클라이언트 컴포넌트 인터리빙 */}
        <UserList usersPromise={usersPromise} />
      </Suspense>
    </section>
  )
}
