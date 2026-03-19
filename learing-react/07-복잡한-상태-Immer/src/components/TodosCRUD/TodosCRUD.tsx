import S from './TodosCRUD.module.css'

// --------------------------------------------------------------
// 실습 가이드
// --------------------------------------------------------------
// - [Create, 생성] 새로운 할 일 추가, 생성 날짜 설정
//    - `id` 값은 `Date.now()`로 설정
//    - `createdAt` 값은 `new Date.toISOString()`로 설정
// - [Read, 조회] 할 일 목록 데이터를 읽어 상태 선언
// - [Update, 수정] 선택된 할 일 완료 여부 토글(toggle), 업데이트 날짜 수정
//    - `updatedAt` 값은 `new Date.toISOString()`로 설정
// - [Delete, 삭제] 선택된 할 일 삭제
// - [Formatting, 형식 변환] 완료 날짜 포맷팅 (예: '2026년 3월 20일')
// - [A11y, 접근성] 초점 이동, 버튼 비활성화 등 사용자 경험 향상 고려
// --------------------------------------------------------------

export default function NestedObject() {

  const todos = [
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

  return (
    <section className={S.container} aria-labelledby="todos-title">
      <header className={S.header}>
        <h2 id="todos-title" className={S.title}>
          객체/배열 <abbr title="Create Read Update Delete">CRUD</abbr> 실습
        </h2>

        <form className={S.form}>
          <input
            type="text"
            className={S.input}
            aria-label="할 일"
            placeholder="오늘 할 일 입력"
          />
          <button type="submit" className={S.buttonAdd}>
            추가
          </button>
        </form>
      </header>

      <ul className={S.list} aria-label="할 일 목록">
        {todos.map((todo) => {
          const todoTextClassName = `${S.text} ${todo.done ? S.completed : ''}`.trim()
          const { createdAt, updatedAt } = todo.metadata

          return (
            <li key={todo.id} className={S.item}>
              <span className={todoTextClassName}>
                {todo.text}
                <span className="sr-only">
                  {!todo.done
                    ? `${createdAt} 생성`
                    : `${updatedAt} 완료`}
                </span>
              </span>
              <div className={S.buttonGroup}>
                <button
                  type="button"
                  className={S.buttonToggle}
                  aria-pressed={todo.done}
                >
                  {todo.done ? '취소' : '완료'}
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