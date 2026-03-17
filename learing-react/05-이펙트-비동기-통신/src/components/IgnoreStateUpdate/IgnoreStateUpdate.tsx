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

    const fetchUser = async () => {
      setPending(true) 

      try {
        const data = await getUser(userId)
        setUser(data.user) 
        setError('')
      } catch(error) {
        setError(error instanceof Error ? error.message : String(error)) 
        setUser(null) 
      } finally {
        setPending(false)
      }
    }
    
    fetchUser()

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
