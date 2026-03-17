import { useEffect, useState } from 'react'
import S from './TodoSearch.module.css'

// API 엔드포인트(Endpoint)
const { VITE_API_URL: API_URL } = import.meta.env

// 응답 데이터 타입 지정
interface ResponseTodosData {
  message: string
  todos: Todo[]
}

interface Todo {
  id: number
  content: string
  completed: boolean
  userId: number
}

export default function TodoSearch() {
  // 리액트로 하여금 화면을 변경
  // 선언적 API로 제어 (상태 선언)
  // - 로딩(loading) 상태
  const [loading, setLoading] = useState(false)
  // - 할 일 목록(todos) 상태
  const [todos, setTodos] = useState<Todo[]>([])
  // - 사용자 ID(userId) 상태
  const [userId, setUserId] = useState('')

  // 사용자 ID 값이 변경될 때마다 이펙트 함수 실행
  useEffect(() => {
    // 비동기 함수 (데이터 페칭(GET 가져오기))
    const getTodos = async () => {
      // userId 상태 값이 빈 문자열인 경우, 함수 종료 (상태 초기화)
      if (userId === '') {
        // todos 상태 초기화
        setTodos([])
        return // 함수 종료 (비동기 요청 안함)
      }

      // loading 상태 업데이트 (로딩 화면 표시)
      setLoading(true)

      // 데이터 요청/응답 (비동기 처리)
      const response = await fetch(`${API_URL}/api/todos?userId=${userId}`)
      const data: ResponseTodosData = await response.json()

      // todos 상태 업데이트 (리스트 렌더링)
      setTodos(data.todos)
      // loading 상태 업데이트 (로딩 화면 감춤)
      setLoading(false)
    }

    getTodos()
  }, [userId])

  return (
    <section className={S.container}>
      <header>
        <h2>사용자 ID로 할 일 찾기</h2>
        <p className={S.info}>사용자 ID를 입력해 목록을 확인하세요.</p>
      </header>

      <div className={S.searchField}>
        <label htmlFor="user-id-input" className="sr-only">
          사용자 ID
        </label>
        <input
          id="user-id-input"
          type="number"
          min={1}
          max={20}
          placeholder="사용자 ID를 입력하세요 (예: 1 ~ 20)"
          value={userId}
          onChange={(e) => setUserId(e.target.value.trim())}
        />
      </div>

      {!loading && todos.length > 0 && (
        <ul className={S.list}>
          {todos.map(({ id, content/* , completed 실제 데이터 */ }) => {
            const isDone = getRandomDone() // 할 일 완료 상태 확인 (목적)
            const doneClassname = isDone ? S.completed : ''

            return (
              <li key={id} className={S.item}>
                <span className={`${S.textContent} ${doneClassname}`}>{content}</span>
                <span
                  aria-label={isDone ? '완료' : '예정'}
                  style={{ opacity: isDone ? 1 : 0.3 }}
                >
                  {isDone ? '✅' : '❎'}
                </span>
              </li>
            )
          })}
        </ul>
      )}

      <div role="status" className={S.statusRegion}>
        {loading && (
          <p className={S.loading}>데이터를 가져오고 있습니다...</p>
        )}

        {!loading && userId && todos.length === 0 && (
          <p>검색 결과가 없습니다.</p>
        )}
      </div>
    </section>
  )
}

// 유틸리티 함수
const getRandomDone = () => Math.random() >= 0.5