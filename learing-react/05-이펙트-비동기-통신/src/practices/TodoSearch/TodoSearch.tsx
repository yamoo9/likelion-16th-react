import { useEffect, useState } from 'react'
import { getRandomCompletedTodos, getTodos, type Todo } from '@/api/getTodos'
import S from './TodoSearch.module.css'

export default function TodoSearch() {
  const [loading, setLoading] = useState(false)
  const [todos, setTodos] = useState<Todo[]>([])
  const [userId, setUserId] = useState('')

  useEffect(() => {
    const fetchTodos = async () => {
      if (userId === '') return setTodos([])
      
      setLoading(true)
      const todos = await getTodos(userId)
      setTodos(todos)
      setLoading(false)
    }

    fetchTodos()
  }, [userId])

  const randomCompletedTodos = getRandomCompletedTodos(todos)

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
          {randomCompletedTodos.map(({ id, content, completed }) => (
            <li key={id} className={S.item}>
              <span
                className={`${S.textContent} ${completed ? S.completed : ''}`}
              >
                {content}
              </span>
              <span
                aria-label={completed ? '완료' : '예정'}
                style={{ opacity: completed ? 1 : 0.3 }}
              >
                {completed ? '✅' : '❎'}
              </span>
            </li>
          ))}
        </ul>
      )}

      <div role="status" className={S.statusRegion}>
        {loading && <p className={S.loading}>데이터를 가져오고 있습니다...</p>}

        {!loading && userId && todos.length === 0 && (
          <p>검색 결과가 없습니다.</p>
        )}
      </div>
    </section>
  )
}
