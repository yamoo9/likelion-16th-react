import { useState, useRef } from 'react'
import S from './TodosCurdWithImmer.module.css'

interface Todo {
  id: string
  text: string
  status: {
    done: boolean
  }
}

const INITIAL_TODOS: Todo[] = [
  { 
    id: 'todo-1773533484499', 
    text: 'Immer로 손쉽게 객체 합성! 😃', 
    status: { done: false },
  },
  {
    id: 'todo-1773533492567',
    text: '전개 연산자 이제 안녕~ 👋',
    status: { done: false },
  },
]

export default function TodosCrudWithImmer() {
  const [todos, setTodos] = useState(INITIAL_TODOS)

  const inputRef = useRef<HTMLInputElement>(null)

  const addTodo = () => {    
    const text = inputRef.current?.value.trim()
    if (!text) return

    const newTodo: Todo = {
      id: `todo-${Date.now()}`,
      text,
      status: { done: false },
    }

    setTodos((prev) => [...prev, newTodo])

    if (inputRef.current) inputRef.current.value = ''
  }

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              status: {
                ...todo.status,
                done: !todo.status.done,
              },
            }
          : todo,
      ),
    )
  }

  const deleteTodo = (id: string) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      setTodos((prev) => prev.filter((todo) => todo.id !== id))
    }
  }
  
	const handleAddTodo = (e: React.SubmitEvent) => {
	  e.preventDefault()
	  addTodo()
	}

  return (
    <section className={S.container} aria-labelledby="todo-title">
      <header className={S.header}>
        <h2 id="todo-title" className={S.title}>
          객체/배열 CRUD 실습
        </h2>

        <form className={S.form} onSubmit={handleAddTodo}>
          <input
            ref={inputRef}
            type="text"
            placeholder="할 일 입력"
            className={S.input}
            aria-label="새 할 일 입력"
          />
          <button type="submit" className={S.buttonAdd}>
            추가
          </button>
        </form>
      </header>

      <ul className={S.list} aria-label="할 일 목록">
        {todos.toReversed().map((todo) => {
          const isDone = todo.status.done
          const todoTextClassName = `
	          ${S.text} ${isDone ? S.completed : ''}
	        `.trim()

          return (
            <li key={todo.id} className={S.item}>
              <span className={todoTextClassName}>
                {isDone && <span className="sr-only">(완료됨) </span>}
                {todo.text}
              </span>
              <div className={S.buttonGroup}>
                <button
                  type="button"
                  className={S.buttonToggle}
                  onClick={() => toggleTodo(todo.id)}
                  aria-pressed={isDone}
                >
                  {isDone ? '취소' : '완료'}
                </button>
                <button
                  type="button"
                  className={S.buttonDelete}
                  onClick={() => deleteTodo(todo.id)}
                  aria-label={`${todo.text} 삭제`}
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