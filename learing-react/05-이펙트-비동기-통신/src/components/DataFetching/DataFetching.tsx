import { useEffect, useState } from 'react'
import S from './DataFetching.module.css'
import { getPosts, type Post } from '@/api/getPosts'

export default function PostList() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    const fetchData = async () => {
      // 로딩 상태 업데이트 요청
      setIsLoading(true)

      try {
        const data = await getPosts()
        // 포스트 리스트 데이터를 상태로 업데이트 요청
        setPosts(data.posts)
      } catch (error) {
        if (error instanceof Error) {
          // 에러 상태 업데이트 요청
          setError(error.message)
        }
      } finally {
        // 로딩 상태 업데이트 요청
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <article className={S.container} aria-busy={isLoading}>
      <h2 className={S.title}>최신 포스트 리스트</h2>

      {/* 1. 로딩 상태 UI */}
      {isLoading && (
        <div role="status" className={`${S.statusMessage} ${S.loading}`}>
          데이터를 로딩중입니다...
        </div>
      )}

      {/* 2. 에러 상태 UI */}
      {!isLoading && error && (
        <div role="alert" className={`${S.statusMessage} ${S.error}`}>
          🚨 {error}
        </div>
      )}

      {/* 3. 성공(로딩 ❌, 에러 ❌, 데이터 ⭕️) 상태 UI */}
      {!isLoading && !error && (
        <ul className={S.postList}>
          {posts.map((post) => {
            const formatDate = new Date(post.createdAt).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })

            return (
              <li key={post.id} className={S.postItem}>
                <h3>{post.title}</h3>
                <p>{post.content} ({formatDate})</p>
              </li>
            )
          })}
        </ul>
      )}
    </article>
  )
}
