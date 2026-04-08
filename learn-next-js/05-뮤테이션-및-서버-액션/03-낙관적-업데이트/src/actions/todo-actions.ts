/**
 * src/database/todos.json 파일을 읽고, 쓰는 함수 작성
 * '할 일 생성/토글' 서버 액션 함수 작성
 */

export interface Todo {
  id: number
  title: string
  done: boolean
}
