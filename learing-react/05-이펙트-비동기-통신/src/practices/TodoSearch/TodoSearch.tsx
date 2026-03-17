import { useEffect, useState } from 'react'
import { getRandomCompletedTodos, getTodos, type Todo } from '@/api/getTodos'
import S from './TodoSearch.module.css'

// 디바운스 시간(ms)
const DEBOUNCE_TIME = 500 // 500ms (200~300ms)

export default function TodoSearch() {
  const [loading, setLoading] = useState(false)
  const [todos, setTodos] = useState<Todo[]>([])
  const [userId, setUserId] = useState('')

  // TODO 1: 상태 업데이트 디바운싱(Debouncing)
  // 사용자 입력이 멈춘 후 특정 시간이 지난 다음 상태 업데이트 요청 처리 (잦은 요청 완화: 성능 최적화)
  
  // TODO 2: 네트워크 요청 중단(abort) ✅
  // 이전 요청이 아직 응답되지 않은 경우, 이전 요청을 중단해 불필요한 요청이 발생하지 않도록 조치 (성능 최적화)

  // TODO 3: 에러 핸들링 ✅
  // 에러가 발생한 상황을 사용자에게 알림 (사용자 경험 최적화)
  useEffect(() => {

    // 아직 응답되지 않은 이전의 네트워크 요청 중단
    const controller = new AbortController()
    const { signal } = controller
    
    // 데이터 가져오기 비동기 함수 
    const fetchTodos = async () => {
      console.log('데이터 가져오기 요청 시작!')

      if (userId === '') return setTodos([])
        
      setLoading(true)
        
      try {
        const todos = await getTodos(userId, { signal })
        setTodos(todos)
      } catch(error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('데이터 로드 실패')
          setTodos([]) // todos 상태 초기화
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false)
        }
      }
    }

    // 디바운스: DEBOUNCE_TIME 만큼 사용자 입력이 더 없다면 그 때 데이터 가져오기 요청
    const debounceId = setTimeout(fetchTodos, DEBOUNCE_TIME)

    // 클린업(정리) 함수
    return () => {
      controller.abort() // 중복 또는 응답되지 않은 이전 요청 중단
      clearTimeout(debounceId) // setTimeout으로 설정된 콜백 함수 실행 중단
    }

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
