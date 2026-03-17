import { useEffect, useState } from 'react'
import { getUser, type User } from '@/api/getUser'
import S from './IgnoreStateUpdate.module.css'

export default function IgnoreStateUpdate() {
  const [userId, setUserId] = useState('')
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  const [user, setUser] = useState<null|User>(null)

  useEffect(() => {
    if (!userId) {
      setUser(null)
      setError('') 
      return
    }

    /**
     * 상태 업데이트 무시(ignore)
     * - 이미 발생한 네트워크 요청을 “실행 취소”할 수는 없지만, 
     *   클린업 함수는 더 이상 관련이 없는 패치(patch)가 애플리케이션에 계속 영향을 미치지 않도록 보장해야 합니다.
     * - 개발 중에는 네트워크 탭에서 두 개의 페치(fetch)가 표시됩니다.
     * - 제품(production) 환경에서는 하나의 요청만 있을 것입니다. (StrictMode이므로 이펙트 함수를 리액트가 2번 실행 시킴)
     * 참고: https://ko.react.dev/learn/synchronizing-with-effects#fetching-data
     */

    // 상태 업데이트를 무시할 이펙트 설정 함수 내 지역 변수 지정
    let ignore = false // '무시하지 말고 상태 업데이트 해'

    const fetchUser = async () => {
      setPending(true) 

      try {
        const data = await getUser(userId)
        
        // 무시(ignore) 값이 false인 경우에만 화면을 바꿔! 리액트
        if (!ignore) {
          setUser(data.user) 
          setError('')
        }

        // 무시(ignore) 값이 true이면 화면을 바꾸지 말고 무시해! 리액트

      } catch(error) {
        setError(error instanceof Error ? error.message : String(error)) 
        setUser(null) 
      } finally {
        if (!ignore) setPending(false)
      }
    }
    
    fetchUser()

    // 요청이 중복될 때 (StrictMode에 의해 이펙트 함수가 두 번 실행, 사용자가 여러 입력으로 userId를 변경할 때)
    // 정리(cleanup)가 필요하겠네!
    return () => {
      // 이전 요청을 무시(ignore)하도록 설정해!
      ignore = true
    }

  }, [userId])

  return (
    <article className={S.container}>
      <header className={S.searchField}>
        <h2 className={S.title}>사용자 검색</h2>
        <label htmlFor="user-search">조회할 사용자 ID (1~20)</label>
        <input
          id="user-search"
          type="number"
          min="1"
          max="20"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="ID를 입력하세요..."
          aria-describedby="search-helper"
        />
        <span id="search-helper" className={S.helperText}>
          1부터 20 사이의 숫자를 입력하면 자동으로 검색됩니다.
        </span>
      </header>

      <div className={S.resultArea}>
        {/* 조건부 UI 렌더링 : 로딩(Loading) 화면 */}
        {pending && (
          <div role="status" className={S.statusText}>
            데이터를 동기화 중입니다...
          </div>
        )}

        {/* 조건부 UI 렌더링 : 에러(Error) 화면 */}
        {!pending && error && (
          <div role="alert" className={`${S.resultCard} ${S.error}`}>
            🚨 사용자 ID "{userId}": {error}
          </div>
        )}

        {/* 조건부 UI 렌더링 : 유저(User) 화면 */}
        {!pending && !error && user && (
          <section className={S.resultCard}>
            <h3>{user.username}</h3>
            <a href={`mailto:${user.email}`}>{user.email}</a>
            <p>{user.address}</p>
          </section>
        )}
      </div>
    </article>
  )
}
