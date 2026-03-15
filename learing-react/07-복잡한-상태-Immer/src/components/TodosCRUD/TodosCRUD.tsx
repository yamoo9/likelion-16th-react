import S from './TodosCRUD.module.css'

const todos = [
  { 
    id: 'todo-1773533484499', 
    text: '중첩된 객체 합성', 
    status: { done: false } 
  },
  {
    id: 'todo-1773533492567',
    text: '전개 연산자 사용 힘들어! 😭',
    status: { done: false },
  },
]

export default function NestedObject() {

  // [Read] 초기 데이터를 읽어 상태 선언 (todos)

  // [Create] 새로운 객체 추가 (addTodo)

  // [Update] 중첩된 객체(status.done) 수정 (toggleTodo)

  // [Delete] 필터링을 통한 삭제 (deleteTodo)

  return (
    <section className={S.container} aria-labelledby="todo-title">
      <header className={S.header}>
        <h2 id="todo-title" className={S.title}>
          객체/배열 CRUD 실습
        </h2>

        <form className={S.form} onSubmit={(e) => e.preventDefault()}>
          <input
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
        {todos.map((todo) => {
          const isDone = todo.status.done
          const todoTextClassName = `${S.text} ${isDone ? S.completed : ''}`.trim()

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
                  aria-pressed={isDone}
                >
                  {isDone ? '취소' : '완료'}
                </button>
                <button
                  type="button"
                  className={S.buttonDelete}
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