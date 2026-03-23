import { useImmer } from 'use-immer'
import { useState, useRef, useId } from 'react'
import S from './TodosCurdWithImmer.module.css'

interface Todo {
  id: string
  text: string
  done: boolean
  metadata: {
    createdAt: string
    updatedAt: string | null
  }
}

const INITIAL_TODOS: Todo[] = [
  {
    id: 'todo-1773533484499',
    text: '중첩된 객체 합성',
    done: false,
    metadata: {
      createdAt: '2026-03-18T17:12:41.964Z',
      updatedAt: null,
    },
  },
  {
    id: 'todo-1773533492567',
    text: '전개 연산자 사용 힘들어! 😭',
    done: false,
    metadata: {
      createdAt: '2026-03-19T21:06:47.985Z',
      updatedAt: null,
    },
  },
]

export default function TodosCrudWithImmer() {
  // 핸들러
  const handleAddTodo = (e: React.SubmitEvent) => {
    e.preventDefault()
    if (isDisabled) return
    addTodo()
  }

  // 상태
  const sectionId = useId()
  const [doIt, setDoIt] = useState('')
  const todoInputRef = useRef<HTMLInputElement>(null)

  // 파생된 상태
  const isDisabled = 1 > doIt.trim().length

  // [읽기]
  // const [todos, setTodos] = useState<Todo[]>(INITIAL_TODOS)

  // Immer 사용 예시 코드
  const [todos, setTodos] = useImmer(INITIAL_TODOS)

  // [쓰기]
  const addTodo = () => {
    const newTodo: Todo = {
      id: `todo-${Date.now()}`,
      text: doIt,
      done: false,
      metadata: {
        createdAt: getCurrentDate(),
        updatedAt: null,
      },
    }

    // setTodos((prev) => [...prev, newTodo])

    // Immer 사용 예시 코드
    setTodos((draft) => {
      draft.push(newTodo)
    })

    // 입력 필드 초기화 & 초점 이동
    setDoIt('')
    todoInputRef.current?.focus()
  }

  // [수정]
  const toggleTodo = (todoId: Todo['id']) => {
    // Immer 사용 예시 코드
    setTodos((draft) => {
      // 초안(대체자) 배열에서 todoId와 일치하는 아이템 찾기
      const item = draft.find((item) => item.id === todoId)

      // 만약 item이 있다면?
      if (item) {
        // 완료(done) 여부 토글
        item.done = !item.done
        // 수정(updatedAt) 날짜 설정
        item.metadata.updatedAt = getCurrentDate()
      }
    })

    // useState 상태 관리 예시 코드
    // setTodos((prev) =>
    //   prev.map((todo) =>
    //     todo.id === todoId
    //       ? {
    //           ...todo,
    //           done: !todo.done,
    //           metadata: {
    //             ...todo.metadata,
    //             updatedAt: getCurrentDate(),
    //           },
    //         }
    //       : todo,
    //   ),
    // )
  }

  // [삭제]
  const deleteTodo = (todoId: Todo['id']) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      // setTodos((prev) => prev.filter((todo) => todo.id !== todoId))

      // Immer 사용 예시 코드
      // setTodos((draft) => {
      //   draft.filter((item) => item.id !== todoId)
      // })

      setTodos((draft) => {
        const index = draft.findIndex((item) => item.id === todoId)
        if (index < 0) return
        draft.splice(index, 1)
      })
    }
  }

  return (
    <section className={S.container} aria-labelledby={sectionId}>
      <header className={S.header}>
        <h2 id={sectionId} className={S.title}>
          객체/배열 CRUD 실습
        </h2>

        <form className={S.form} onSubmit={handleAddTodo}>
          <input
            type="text"
            placeholder="할 일"
            aria-label="새 할 일 입력"
            className={S.input}
            ref={todoInputRef}
            value={doIt}
            onChange={(e) => setDoIt(e.target.value)}
          />
          <button
            type="submit"
            className={S.buttonAdd}
            aria-disabled={isDisabled}
          >
            추가
          </button>
        </form>
      </header>

      <ul className={S.list} aria-label="할 일 목록">
        {todos.toReversed().map((todo) => {
          const todoTextClassName =
            `${S.text} ${todo.done ? S.completed : ''}`.trim()
          const { createdAt, updatedAt } = todo.metadata

          return (
            <li key={todo.id} className={S.item}>
              <span className={todoTextClassName}>
                {todo.text}
                <span className="sr-only">
                  {!todo.done
                    ? `${formatData(createdAt)} 생성`
                    : `${formatData(updatedAt ?? getCurrentDate())} 완료`}
                </span>
              </span>
              <div className={S.buttonGroup}>
                <button
                  type="button"
                  className={S.buttonToggle}
                  aria-pressed={todo.done}
                  onClick={() => toggleTodo(todo.id)}
                >
                  {todo.done ? '취소' : '완료'}
                </button>
                <button
                  type="button"
                  className={S.buttonDelete}
                  aria-label={`${todo.text} 삭제`}
                  onClick={() => deleteTodo(todo.id)}
                >
                  삭제
                </button>
              </div>
            </li>
          )
        })}
      </ul>

      {todos.length === 0 && (
        <p className={S.empty}>할 일 목록이 비어 있습니다.</p>
      )}
    </section>
  )
}

function getCurrentDate() {
  return new Date().toISOString()
}

function formatData(dateInfo: string) {
  return new Date(dateInfo).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
