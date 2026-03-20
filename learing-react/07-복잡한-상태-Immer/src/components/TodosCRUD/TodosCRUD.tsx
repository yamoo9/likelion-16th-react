import { useRef, useState } from 'react'
import { formatDate } from '@/utils'
import type { Todo } from './type'
import S from './TodosCRUD.module.css'

// --------------------------------------------------------------
// 실습 가이드
// --------------------------------------------------------------
//
// - [Read, 조회] 할 일 목록 데이터를 읽어 상태 선언 ✅
//
// - [Create, 생성] 새로운 할 일 추가, 생성 날짜 설정 ✅
//    - `id` 값은 `Date.now()`로 설정 ✅
//    - `createdAt` 값은 `new Date().toISOString()`로 설정 ✅
//    - 디바운싱(Debouncing) 적용 → 렌더링 횟수 줄여서 성능 저하 방지 ✅
//
// - [Update, 수정] 선택된 할 일 완료 여부 토글(toggle), 업데이트 날짜 수정 ✅
//    - `updatedAt` 값은 `new Date().toISOString()`로 설정 ✅
//
// - [Delete, 삭제] 선택된 할 일 삭제 ✅
//
// - [Formatting, 형식 변환] 완료 날짜 포맷팅 (예: '2026년 3월 20일') ✅
//
// - [A11y, 접근성] 초점 이동, 버튼 비활성화 등 사용자 경험 향상 고려 ✅
//
// --------------------------------------------------------------

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

const DEBOUNCE_TIME = 350

const getCurrentDateString = () => new Date().toISOString()

export default function NestedObject() {
  // 할 일 목록 (상태)
  const [todos, setTodos] = useState(INITIAL_TODOS)
  // console.log(todos)

  // 할 일을 뒤집은 목록 (파생된 상태: 상태가 변경되면 렌더링 중에 다시 계산된 값)
  const reversedTodos = todos.toReversed()

  // <input> 참조 (DOM 접근/조작)
  const doitRef = useRef<HTMLInputElement>(null)

  // 할 일 생성(Create)
  const addTodo = (doit: Todo['text']) => {
    // 새로운 할 일 객체
    const newTodo: Todo = {
      id: `todo-${Date.now()}`,
      text: doit,
      done: false,
      metadata: {
        createdAt: getCurrentDateString(),
        updatedAt: null,
      },
    }

    // 상태 업데이트 요청 (업데이트 함수 활용)
    const nextTodos = [...todos, newTodo]
    setTodos(nextTodos)
  }

  // 할 일 수정(Update)
  const updateTodo = (todoId: Todo['id']) =>
    setTodos(
      todos.map((todo) =>
        todo.id !== todoId
          ? todo
          : {
              ...todo,
              done: !todo.done,
              metadata: {
                ...todo.metadata,
                updatedAt: getCurrentDateString(),
              },
            },
      ),
    )

  // 할 일 삭제(Delete)
  const deleteTodo = (todoId: Todo['id']) => {
    // 삭제 로직 (원본 배열을 변경하지 않고, 복제본을 사용 해결)

    if (confirm('정말로 할 일을 삭제하시겠습니까?')) {
      const nextTodos = todos.filter((todo) => todo.id !== todoId)
      setTodos(nextTodos)
    }
  }

  // 입력 필드 사용 방식
  // - [제어 → 선언적 해결: useState]
  // - [비제어 → 명령형 해결: 이펙트 대신에 이벤트 + useRef]
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    // 브라우저 기본 작동 방지
    e.preventDefault()

    // FormData 생성 (웹 표준 방식으로 사용자 입력 값 읽기)
    const formData = new FormData(e.currentTarget)
    const doit = formData.get('doit') as string // 타입 단언

    // 유효성 검사 & 할 일 추가
    if (doit && doit.trim().length > 0) {
      // 할 일 추가
      addTodo(doit)

      // 할 일 입력 필드 초기화
      const doitInput = doitRef.current
      if (doitInput) {
        doitInput.value = ''
        doitInput.focus()
      }
    }
  }

  // [방법 1] 비제어 방식: 명령형 프로그래밍으로 사용자가 직접 화면 제어
  const addButtonRef = useRef<HTMLButtonElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleUncontrolledInput = (e: React.InputEvent<HTMLInputElement>) => {
    const input = e.currentTarget.value
    const addButton = addButtonRef.current

    // if 조건문
    if (input.trim().length > 0) {
      addButton?.setAttribute('aria-disabled', 'false')
    } else {
      addButton?.setAttribute('aria-disabled', 'true')
    }
  }

  // [방법 2] 제어 방식: 상태 선언 (상태 변경 → 리액트가 화면 제어)
  // 상태
  const [doit, setDoit] = useState('')

  // 파생된 상태
  const isDisabled = 1 > doit.trim().length

  // [디바운스: 렌더링 횟수 완화]
  // 리액트 렌더링 프로세스와 무관하게 특정 값을 기억해야 한다. (타이머 ID 기억)
  const timeoutIdRef = useRef<null|number>(null) // ReturnType<typeof setTimeout>

  // 이벤트 핸들러 (상태 업데이트 로직 포함)
  const handleChangeDoit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    
    const timeoutId = timeoutIdRef.current

    // 타이머가 이미 설정되어 있다면 (timeoutIdRef.current 값이 null이 아닌 경우),
    // 사용자가 입력할 때마다 설정된 타이머 해제
    if (timeoutId) clearTimeout(timeoutId)
    
    // 특정 시간이 지난 후 상태 업데이트 (타이머 설정)
    timeoutIdRef.current = setTimeout(() => {
      setDoit(value)
    }, DEBOUNCE_TIME)
  }

  return (
    <section className={S.container} aria-labelledby="todos-title">
      <header className={S.header}>
        <h2 id="todos-title" className={S.title}>
          객체/배열 <abbr title="Create Read Update Delete">CRUD</abbr> 실습
        </h2>

        <form className={S.form} onSubmit={handleSubmit}>
          <input
            ref={doitRef}
            // [방법 1] 비제어 방식
            // onInput={handleUncontrolledInput}
            // [방법 2] 제어 방식
            defaultValue={doit}
            onChange={handleChangeDoit}
            type="text"
            name="doit"
            className={S.input}
            aria-label="할 일"
            placeholder="오늘 할 일 입력"
          />
          <button
            ref={addButtonRef}
            type="submit"
            className={S.buttonAdd}
            // [방법 1] 비제어 방식
            // aria-disabled="true"
            // [방법 2] 제어 방식
            aria-disabled={isDisabled}
          >
            추가
          </button>
        </form>
      </header>

      <ul className={S.list} aria-label="할 일 목록">
        {reversedTodos.map((todo) => {
          const todoTextClassName =
            `${S.text} ${todo.done ? S.completed : ''}`.trim()
          const { createdAt, updatedAt } = todo.metadata

          return (
            <li key={todo.id} className={S.item}>
              <span className={todoTextClassName}>
                {todo.text}
                <span className="sr-only">
                  {!todo.done
                    ? `${formatDate(createdAt)} 생성`
                    : `${formatDate(updatedAt ?? '')} 완료`}
                </span>
              </span>
              <div className={S.buttonGroup}>
                <button
                  type="button"
                  className={S.buttonToggle}
                  aria-pressed={todo.done}
                  onClick={() => updateTodo(todo.id)}
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
