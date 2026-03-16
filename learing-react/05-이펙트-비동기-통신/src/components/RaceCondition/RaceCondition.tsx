import { useEffect, useState } from 'react'
import S from './RaceCondition.module.css'
import { getUser, type User } from '@/api/getUser'

export default function RaceCondition() {
  // 리액트가 제어할 상태(State) 선언
  // 상태가 변경되면 리액트가 화면을 다시 그림(Rendering)
  const [userId, setUserId] = useState('')
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  const [user, setUser] = useState<null|User>(null)

  // 이펙트 내부에서 데이터 가져오기 (외부 시스템과 동기화)
  // 데이터 가져오기 상황(로딩, 에러, 데이터)에 따라 상태 업데이트 요청(Trigger)
  useEffect(() => {
    if (!userId) {
      setUser(null) // 유저 데이터 초기화
      setError('')  // 에러 데이터 초기화
      return // 불필요한 이펙트 함수 실행 차단(중지)
    }

    // AbortController 객체 생성
    const controller = new AbortController()
    const { signal } = controller

    // 서버에 데이터 요청/응답 처리 비동기 함수
    const fetchUser = async () => {
      setPending(true) // 로딩 상태 업데이트 요청 (화면 변경)

      try {
        const data = await getUser(userId, { signal })
        setUser(data.user) // 유저 상태 업데이트 요청 (화면 변경)
      } catch(error) {
        
        if (error instanceof Error) {
          console.log(error.name)

          setError(error.message) // 에러 상태 업데이트 요청 (화면 변경)
          setUser(null) // 이전 기록된 유저 정보를 초기화
        }
      } finally {
        setPending(false) // 로딩 상태 업데이트 요청 (화면 변경)
      }
    }

    // 데이터 가져오기 함수 실행
    fetchUser()

    // 클린업(정리)
    return () => {
      // 이전 요청 중단
      controller.abort('사용자가 직접 신호를 통해 중단시켰습니다.')
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
          <div role="alert" className={S.resultCard} style={{ color: '#f00' }}>
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
