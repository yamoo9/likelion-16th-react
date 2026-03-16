import { useState, useEffect } from 'react'
import S from './DataFetching.module.css'

// [리액트 안(내부 시스템) [밖(외부 시스템)]에서] 데이터 가져오기(Data Fetching) URL
const { VITE_API_URL } = import.meta.env

const PAGE = 1
const LIMIT = 5

const POSTS_ENDPOINT = `${VITE_API_URL}/api/posts?page=${PAGE}&limit=${LIMIT}`

export default function PostList() {
  console.log('[리액트] 상태 선언')
  // 로딩 상태 (boolean)
  const [isLoading, setIsLoading] = useState(false)

  // 에러 상태 (string)
  const [error, setError] = useState('')

  // 데이터 (Type[])
  const [posts, setPosts] = useState([])

  // 외부 시스템과 리액트의 앱의 동기화(sync)
  useEffect(() => {
    console.log('[이펙트] 시작')

   // 데이터 가져오기 비동기 함수
   const fetchData = async () => {
      console.log('[이펙트: 데이터 가져오기] 시작')
      // 로딩 화면 표시 (로딩 상태를 true로 변경 : 리액트에게 렌더 트리거(요청))
      setIsLoading(true)

      try {
        // 데이터 가져오기 시도
        const response = await fetch(POSTS_ENDPOINT)
        if (!response.ok) throw new Error('포스트 리스트 데이터 가져오기에 실패했습니다.')
        // 성공한 경우
        // 데이터 상태 업데이트 요청 (렌더 트리거)
        const data = await response.json() // { posts, message, page, limit, hasNextPage }
        setPosts(data.posts)
      } catch(error) {
        // 실패한 경우
        // 에러 상태 업데이트 요청 (렌더 트리거)
        if (error instanceof Error) {
          setError(error.message)
        }
      } finally {
        // 요청 응답 성공/실패 유무와 상관없이 항상 실행
        // 로딩 화면 감춤
        setIsLoading(false)
      }
   }

   // 데이터 가져오기 함수 실행
   console.log('[이펙트] fetchData() 함수 실행')
   fetchData()
  }, [])

  console.log('[리액트] 리엑트 트리 반환')
  return (
    <article className={S.container} aria-busy={isLoading}>
      <h2 className={S.title}>최신 포스트 리스트</h2>

      {/* 1. 로딩 상태 UI */}
      {
        isLoading && (
          <div role='status' className={`${S.statusMessage} ${S.loading}`}>
            데이터를 로딩중입니다...
          </div>
        )
      }


      {/* 2. 에러 상태 UI */}
      {!isLoading && error && (
        <div role='alert' className={`${S.statusMessage} ${S.error}`}>
          🚨 {error}
        </div>
      )}

      {/* 3. 성공(로딩 ❌, 에러 ❌, 데이터 ⭕️) 상태 UI */}
      {
        !isLoading && !error && (
          <ul className={S.postList}>
            {
              posts.map((post) => {
                return (
                  <li key={post.id} className={S.postItem}>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                  </li>
                )
              })
            }
          </ul>
        )
      }
      
    </article>
  )
}
